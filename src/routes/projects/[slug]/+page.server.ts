import { HttpStatusCode } from '$lib/statuscodes';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { allProjects } = await parent();
	const project = allProjects.find((p) => p.slug == params.slug);
	const projects = allProjects.filter((p) => !p.is_side_project);
	const side_projects = allProjects.filter((p) => p.is_side_project);

	if (!project) throw error(HttpStatusCode.NOT_FOUND, 'Project not found.');

	return { project, projects, side_projects };
}) satisfies PageServerLoad;
