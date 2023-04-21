<script lang="ts">
	import { PAGINATION_KEY } from '$lib/constants';
	import type { GetPostsWithCategory } from '$lib/gql/generated';
	export let count: number = 10;
	export let current: number = 1;
	export let limit: number = 1;

	$: pages = Math.ceil(count / limit);
	$: pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
	// $: console.log({ pages, count, limit, offset });
	$: nextPageUrl = '?' + PAGINATION_KEY + '=' + (current + 1).toString();
	$: prevPageUrl = '?' + PAGINATION_KEY + '=' + (current - 1).toString();
</script>

<!-- pagination  -->
<div class="pagination d-flex flex-wrap gap-2" role="pagination">
	<a href={prevPageUrl} disabled={current <= 1} role="button" class="contrast outline">Prev</a>

	{#each pagesArray as page}
		<a href={'?' + PAGINATION_KEY + '=' + page.toString()} role="button" class="primary outline"
			>{page}</a
		>
	{/each}
	<a href={nextPageUrl} disabled={current >= pages} role="button" class="contrast outline">Next</a>
</div>

<style>
	.pagination {
		user-select: none;
	}
</style>
