import { error } from '@sveltejs/kit';
import { BLOG_POST_COUNT } from '$lib/constants';
import type { PageServerLoad } from './$types';
import type { IPost } from '$lib/types';
import { HttpStatusCode } from '$lib/statuscodes';

export const load = (async ({ locals, url }) => {
	const page = url.searchParams.get('page') || '1';
	const current = Math.max(parseInt(page), 1);

	let limit: number = BLOG_POST_COUNT; //change later
	let offset: number = (current - 1) * limit;
	try {
		const result = await locals.pb
			.collection('posts')
			.getList<IPost>(current, BLOG_POST_COUNT, { sort: 'title', expand: 'tags' });
		return {
			posts: structuredClone(result.items) as IPost[],
			count: result.totalItems,
			pagination: {
				current,
				limit,
				offset
			}
		};
	} catch (err) {
		console.error(err);
		throw error(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error Loading Posts.');
	}
}) satisfies PageServerLoad;
