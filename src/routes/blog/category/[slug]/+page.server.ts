import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { BLOG_POST_COUNT } from '$lib/constants';
import type { IPost, ITag } from '$lib/types';
import { HttpStatusCode } from '$lib/statuscodes';

export const load: PageServerLoad = (async ({ locals, url, params }) => {
	try {
		const tag = await locals.pb
			.collection('tags')
			.getFirstListItem<ITag>(`slug = "${params.slug}"`);
		if (!tag) throw error(HttpStatusCode.NOT_FOUND, 'Error Loading Tag.');
		// return { post: structuredClone(post) as IPost };
		const page = url.searchParams.get('page') || '1';
		const current = Math.max(parseInt(page), 1);
		let limit: number = BLOG_POST_COUNT; //change later
		let offset: number = (current - 1) * limit;
		const result = await locals.pb.collection('posts').getList<IPost>(current, BLOG_POST_COUNT, {
			filter: `tags ~ "%${tag.id}%"`,
			sort: 'title',
			expand: 'tags'
		});
		return {
			posts: structuredClone(result.items) as IPost[],
			count: result.totalItems,
			pagination: {
				current,
				limit,
				offset
			},
			tag: structuredClone(tag)
		};
	} catch (err) {
		console.error(err);
		throw error(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error Loading Post.');
	}
	// const page = url.searchParams.get('page') || '1'
	// const current = Math.max(parseInt(page), 1)
	// let limit: number = BLOG_POST_COUNT; //change later
	// let offset: number = (current - 1) * limit;
	// try {
	//     const { data, error: resError } = await client
	//         .query<GetPostsByCategory, GetPostsByCategoryVariables>(GetPostsByCategoryDocument, {
	//             limit, offset, orderBy: "ASC", cat: params.slug
	//         })
	//         .toPromise();
	//     if (resError) throw error(501, resError as any);
	//     if (!data?.getPostsByCategory) throw error(404, ("No Posts Found." as any));
	//     return {
	//         posts: data.getPostsByCategory,
	//         count: data.getPostCount,
	//         pagination: { current, limit, offset },
	//         cat: params.slug
	//     }
	// } catch (err: any) {
	//     console.log(err)
	//     throw error(404, err);
	// }
}) satisfies PageServerLoad;
