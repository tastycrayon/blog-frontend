import { error, type ServerLoad } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { GetPostWithCatBySlugDocument } from "$lib/gql/generated";
import type { GetPostWithCatBySlug, GetPostWithCatBySlugVariables } from "$lib/gql/generated";
import { client, } from "$lib/client";

export const load = (async ({ params }) => {
  try {
    const { data, error: resError } = await client
      .query<GetPostWithCatBySlug, GetPostWithCatBySlugVariables>(GetPostWithCatBySlugDocument, {
        slug: params.slug,
      })
      .toPromise();
    if (resError) throw resError;

    if (!data?.getPostWithCatBySlug) throw error(501, ("No Posts Found." as any));
    return data.getPostWithCatBySlug
  } catch (err: any) {
    console.log({ err })
    throw error(404);
  }
}) satisfies PageServerLoad;

