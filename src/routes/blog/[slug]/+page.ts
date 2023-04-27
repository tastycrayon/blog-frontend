import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { GetPostWithCatBySlugDocument } from "$lib/gql/generated";
import type { GetPostWithCatBySlug, GetPostWithCatBySlugVariables } from "$lib/gql/generated";
import { client } from "$lib/client";

export const load = (async ({ params }) => {
  try {
    const { data, error: resError } = await client
      .query<GetPostWithCatBySlug, GetPostWithCatBySlugVariables>(GetPostWithCatBySlugDocument, {
        slug: params.slug,
      })
      .toPromise();
    if (resError) throw resError;
    if (data)
      return { ...data.getPostWithCatBySlug }
  } catch (err) {
    throw error(404,);
  }
}) satisfies PageLoad;

// export const ssr = true;