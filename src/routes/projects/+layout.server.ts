import { error } from '@sveltejs/kit';
import { BLOG_POST_COUNT } from '$lib/constants';
import type { IPost, IProject } from '$lib/types';
import { HttpStatusCode } from '$lib/statuscodes';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	try {
		const projects = await locals.pb
			.collection('projects')
			.getFullList<IProject>({ sort: 'title' });
		return { allProjects: structuredClone(projects) as IProject[] };
	} catch (err) {
		console.error(err);
		throw error(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error Loading Tags.');
	}
}) satisfies LayoutServerLoad;
