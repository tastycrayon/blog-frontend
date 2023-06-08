import { HttpStatusCode } from '$lib/statuscodes';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { ITag } from '$lib/types';

export const load = (async ({ locals }) => {
	try {
		const tags = await locals.pb.collection('tags').getFullList<ITag>({ sort: 'title' });
		return { allTags: structuredClone(tags) as ITag[] };
	} catch (err) {
		console.error(err);
		throw error(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error Loading Tags.');
	}
}) satisfies LayoutServerLoad;
export const prerender = false;
