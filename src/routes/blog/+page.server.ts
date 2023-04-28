import { GetPostsWithCategoryDocument } from "$lib/gql/generated";
import type { GetPostsWithCategory, GetPostsWithCategoryVariables } from "$lib/gql/generated";
import { client } from "$lib/client";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { BLOG_POST_COUNT } from "$lib/constants";

export const load = (async ({ url }) => {
  const page = url.searchParams.get('page') || '1'
  const current = Math.max(parseInt(page), 1)

  let limit: number = BLOG_POST_COUNT; //change later
  let offset: number = (current - 1) * limit;
  try {
    const { data, error: resError } = await client
      .query<GetPostsWithCategory, GetPostsWithCategoryVariables>(GetPostsWithCategoryDocument, {
        limit, offset, orderBy: "ASC"
      })
      .toPromise();
    if (resError) throw error(501, resError as any);

    if (!data?.getPostsWithCategory) throw error(501, ("Internal Error." as any));
    return { posts: data.getPostsWithCategory, count: data.getPostCount, pagination: { current, limit, offset } }
  } catch (err: any) {
    console.log(err)
    throw error(404);
  }
}) satisfies PageServerLoad;
