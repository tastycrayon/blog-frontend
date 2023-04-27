<script lang="ts">
	import Breadcrumb from '$components/breadcrumb.svelte';
	import { BLOG_ROOT_URL, CATEGORY_ROOT_URL } from '$lib/constants';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ post, categories, allCategories } = data);
</script>

<svelte:head>
	<meta property="og:title" content={post.post_title} />
	<!-- <meta property="og:description" content="A Bengali full-stack dev with a lot of dedication" /> -->
	{#if post?.post_image}
		<meta property="og:image" content={post.post_image.image_url} />
	{/if}
</svelte:head>
<Breadcrumb title={post.post_title} />
<div>
	<hr />
</div>
<div class="container mt-2 mt-lg-5">
	<div class="row">
		<div class="col-12 col-lg-9">
			<header><h1 class="mb-1">{post.post_title || ''}</h1></header>
			{#if post?.post_image}
				<img
					class="w-100"
					src={post.post_image.image_url || ''}
					alt={post.post_image.image_title || post.post_title}
				/>
			{/if}
			<div class="my-3">{@html post.post_content || ''}</div>
			<footer>
				{#if categories}
					<nav>
						<ul>
							{#each categories as cat}
								<li>
									<a class="contrast" href={BLOG_ROOT_URL + cat.category_slug}
										><u>{cat.category_title}</u>
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				{/if}
			</footer>
		</div>
		<aside class="col-12 col-lg-3">
			<h3 class="mb-1">Categories</h3>
			<ul>
				{#each allCategories as cat}
					<li class="category-item py-1">
						<a
							class="contrast"
							href={['', BLOG_ROOT_URL, CATEGORY_ROOT_URL, cat.category_slug].join('/')}
							><big>{cat.category_title}</big>
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
