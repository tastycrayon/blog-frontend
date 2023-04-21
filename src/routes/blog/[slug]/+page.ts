import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { GetPostWithCatBySlugDocument } from "$lib/gql/generated";
import type { GetPostWithCatBySlug, GetPostWithCatBySlugVariables } from "$lib/gql/generated";
import { client } from "$lib/client";

export const load = (async ({ params }) => {
  try {
    const { data, error } = await client
      .query<GetPostWithCatBySlug, GetPostWithCatBySlugVariables>(GetPostWithCatBySlugDocument, {
        slug: params.slug,
      })
      .toPromise();
    if (error) throw error;
    if (data)
      return data.getPostWithCatBySlug
  } catch (err) {
    throw error(404,);
  }
}) satisfies PageLoad;

// export const ssr = true;
