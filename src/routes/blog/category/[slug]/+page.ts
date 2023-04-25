import { GetPostsByCategoryDocument } from "$lib/gql/generated";
import type { GetPostsByCategory, GetPostsByCategoryVariables } from "$lib/gql/generated";
import { client } from "$lib/client";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { BLOG_POST_COUNT } from "$lib/constants";

export const load = (async ({ url, params }) => {
    const page = url.searchParams.get('page') || '1'
    const current = Math.max(parseInt(page), 1)

    let limit: number = BLOG_POST_COUNT; //change later
    let offset: number = (current - 1) * limit;
    try {
        const { data, error: resError } = await client
            .query<GetPostsByCategory, GetPostsByCategoryVariables>(GetPostsByCategoryDocument, {
                limit, offset, orderBy: "ASC", cat: params.slug
            })
            .toPromise();
        if (resError) throw error(501, resError as any);
        if (!data?.getPostsByCategory) throw error(404, ("No Posts Found." as any));
        return {
            posts: data.getPostsByCategory,
            count: data.getPostCount,
            pagination: { current, limit, offset },
            cat: params.slug
        }
    } catch (err: any) {
        throw error(err);
    }
}) satisfies PageLoad;