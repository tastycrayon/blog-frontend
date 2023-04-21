import { GetCategoriesDocument } from "$lib/gql/generated";
import type { GetCategories, GetCategoriesVariables } from "$lib/gql/generated";
import { client } from "$lib/client";
import { error, type Load } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: Load = (async ({ }) => {
    try {
        const { data, error: resError } = await client
            .query<GetCategories, GetCategoriesVariables>(GetCategoriesDocument, {})
            .toPromise();
        if (resError) throw error(501, resError as any);
        if (!data?.getCategories) throw error(501, ("Internal Error." as any));

        return { allCategories: data.getCategories, }
    } catch (err: any) {
        throw error(err);
    }
}) satisfies PageLoad;

// export const ssr = true;