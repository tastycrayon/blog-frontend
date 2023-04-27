import { error } from "@sveltejs/kit";
import { PROJECTS, SIDE_PROJECTS } from '../data'
import type { PageLoad } from "./$types";
export const load = (async ({ params }) => {
  try {
    const data = PROJECTS.find((p) => p.post_slug == params.slug)
      || SIDE_PROJECTS.find((p) => p.post_slug == params.slug)

    if (data) return data
  } catch (err) {
    throw error(404,);
  }
}) satisfies PageLoad;

export const ssr = true;
