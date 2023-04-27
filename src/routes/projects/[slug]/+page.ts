import { error } from "@sveltejs/kit";
import { PROJECTS, SIDE_PROJECTS } from '$lib/data'
import type { PageLoad } from "./$types";
export const load = (async ({ params }) => {
  try {
    const data = PROJECTS.find((p) => p.post_slug == params.slug)
      || SIDE_PROJECTS.find((p) => p.post_slug == params.slug)

    if (!data) throw new Error("Not Found");
    return { post: data, PROJECTS, SIDE_PROJECTS }
  } catch (err) {
    throw error(404,);
  }
}) satisfies PageLoad;

export const ssr = true;
