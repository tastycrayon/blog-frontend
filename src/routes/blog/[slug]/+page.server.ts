import { HttpStatusCode } from '$lib/statuscodes';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IPost, ITag } from '$lib/types';

export const load = (async ({ locals, params }) => {
	try {
		const post = await locals.pb
			.collection('posts')
			.getFirstListItem<IPost>(`slug = "${params.slug}"`);
		if (!post) throw error(HttpStatusCode.NOT_FOUND, 'Error Loading Post.');
		return { post: structuredClone(post) as IPost };
	} catch (err) {
		console.error(err);
		throw error(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error Loading Post.');
	}
}) satisfies PageServerLoad;
