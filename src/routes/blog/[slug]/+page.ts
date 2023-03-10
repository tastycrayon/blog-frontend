import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { GetPostBySlugDocument } from "$lib/gql/generated";
import type { GetPostBySlug, GetPostBySlugVariables } from "$lib/gql/generated";
import { client } from "$lib/client";

export const load = (async ({ params }) => {
  try {
    const { data, error } = await client
      .query<GetPostBySlug, GetPostBySlugVariables>(GetPostBySlugDocument, {
        slug: params.slug,
      })
      .toPromise();
    if (error) throw error;
    if (data)
      return {
        post: data.getPostBySlug,
      };
  } catch (err) {
    throw error(404, "Not found");
  }
}) satisfies PageLoad;

export const ssr = true;
