<script lang="ts">
	import { BLOG_POST_COUNT, PAGINATION_KEY } from '$lib/constants';
	export let count: number = 1;
	export let current: number = 1;
	export let limit: number = BLOG_POST_COUNT;

	$: pages = Math.ceil(count / limit);
	$: pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
	// $: console.log({ pages, count, limit, offset });
	$: nextPageUrl = '?' + PAGINATION_KEY + '=' + (current + 1).toString();
	$: prevPageUrl = '?' + PAGINATION_KEY + '=' + (current - 1).toString();
</script>

<!-- pagination  -->
<div class="pagination d-flex flex-wrap gap-2">
	{#if current <= 1}
		<button disabled class="contrast outline mb-0 w-auto">Prev</button>
	{:else}
		<a href={prevPageUrl} role="button" class="contrast outline">Prev</a>
	{/if}
	{#each pagesArray as page}
		{#if current == page}
			<button disabled class="contrast mb-0 w-auto">{page}</button>
		{:else}
			<a href={'?' + PAGINATION_KEY + '=' + page.toString()} role="button" class="outline">{page}</a
			>
		{/if}
	{/each}

	{#if current >= pages}
		<button disabled class="contrast outline mb-0 w-auto">Next</button>
	{:else}
		<a href={nextPageUrl} role="button" class="contrast outline">Next</a>
	{/if}
</div>

<style>
	.pagination {
		user-select: none;
	}
</style>
