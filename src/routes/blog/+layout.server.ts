import { GetCategoriesDocument } from "$lib/gql/generated";
import type { GetCategories, GetCategoriesVariables } from "$lib/gql/generated";
import { client } from "$lib/client";
import { error, type ServerLoad } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: ServerLoad = (async () => {
    try {
        const { data, error: resError } = await client
            .query<GetCategories, GetCategoriesVariables>(GetCategoriesDocument, {})
            .toPromise();
        if (resError) throw error(501, resError as any);
        if (!data?.getCategories) throw error(501, ("Internal Error." as any));

        return { allCategories: data.getCategories, }
    } catch (err: any) {
        console.log(err)
        throw error(404,);
    }
}) satisfies PageServerLoad;

