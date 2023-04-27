import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { GetPostWithCatBySlugDocument } from "$lib/gql/generated";
import type { GetPostWithCatBySlug, GetPostWithCatBySlugVariables } from "$lib/gql/generated";
import { client, createClientWithFetch } from "$lib/client";

export const load = (async ({ params, fetch }) => {
  try {
    const c = createClientWithFetch(fetch)
    const { data, error: resError } = await c
      .query<GetPostWithCatBySlug, GetPostWithCatBySlugVariables>(GetPostWithCatBySlugDocument, {
        slug: params.slug,
      })
      .toPromise();
    if (resError) throw resError;
    if (!data?.getPostWithCatBySlug) throw error(404, ("No Posts Found." as any));
    return data.getPostWithCatBySlug
  } catch (err) {
    throw error(404,);
  }
}) satisfies PageLoad;

// export const ssr = true;