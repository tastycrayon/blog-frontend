<script lang="ts">
	import Breadcrumb from '$components/breadcrumb.svelte';
	import { BLOG_ROOT_URL, CATEGORY_ROOT_URL } from '$lib/constants';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ post, allTags } = data);
</script>

<svelte:head>
	<meta property="og:title" content={post.title} />
	<!-- <meta property="og:description" content="A Bengali full-stack dev with a lot of dedication" /> -->
	{#if post?.cover}
		<meta property="og:image" content={post.cover} />
	{/if}
</svelte:head>
<Breadcrumb title={post.title} />
<div>
	<hr />
</div>
<div class="container mt-2 mt-lg-5">
	<div class="row">
		<div class="col-12 col-lg-9">
			<header><h1 class="mb-1">{post.title || ''}</h1></header>
			{#if post.cover}
				<img class="w-100" src={post.cover || ''} alt={post.title} />
			{/if}
			<div class="my-3">{@html post.content || ''}</div>
			<footer>
				{#if post.tags}
					<nav>
						<ul>
							{#each post.tags as tag}
								{#if typeof tag == 'object'}
									<li>
										<a class="contrast" href={[BLOG_ROOT_URL, '/', tag.slug].join('')}
											><u>{tag.title}</u>
										</a>
									</li>
								{/if}
							{/each}
						</ul>
					</nav>
				{/if}
			</footer>
		</div>
		<aside class="col-12 col-lg-3">
			<h3 class="mb-1">Categories</h3>
			<ul>
				{#each allTags as tag}
					<li class="category-item py-1">
						<a class="contrast" href={[BLOG_ROOT_URL, CATEGORY_ROOT_URL, '/', tag.slug].join('')}
							><big>{tag.title}</big>
						</a>
					</li>
				{/each}
			</ul>
		</aside>
	</div>
</div>

<style lang="scss">
	li.category-item {
		display: list-item;
	}
</style>
