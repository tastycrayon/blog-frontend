import { GetCategoriesDocument } from "$lib/gql/generated";
import type { GetCategories, GetCategoriesVariables } from "$lib/gql/generated";
import { client, createClientWithFetch } from "$lib/client";
import { error, type Load } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: Load = (async ({ fetch }) => {
    try {
        const c = createClientWithFetch(fetch)
        const { data, error: resError } = await c
            .query<GetCategories, GetCategoriesVariables>(GetCategoriesDocument, {})
            .toPromise().then(c => {
                console.log(c)
                return c
            });
        console.log({ resError, data })
        if (resError) throw error(501, resError as any);
        if (!data?.getCategories) throw ("Internal Error." as any);
        return { allCategories: data.getCategories, }
    } catch (err: any) {
        console.log("error here")
        console.error(err)
        throw error(400,);
    }
}) satisfies PageLoad;

// export const ssr = true;