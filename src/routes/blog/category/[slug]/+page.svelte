<script lang="ts">
	import { timeSince } from '$lib/util';
	import { BLOG_ROOT_URL, CATEGORY_ROOT_URL, PAGINATION_KEY } from '$lib/constants';
	import type { PageData } from './$types';
	import Pagination from '$components/pagination.svelte';
	export let data: PageData;
	$: ({ posts, allCategories, count, cat } = data);
	$: ({
		pagination: { current, limit }
	} = data);
</script>

<!-- OPENGRAPH -->
<svelte:head>
	<meta property="og:title" content="CATEGORY BLOG | MOSI" />
	<!-- <meta property="og:description" content="A Bengali full-stack dev with a lot of dedication" /> -->
	<meta property="og:image" content="opengraph.png" />
</svelte:head>
<!-- OPENGRAPH -->
<div class="container">
	<header>
		<h1 class="mb-0">Mosi's Blog</h1>
		<nav>
			<ul>
				{#each allCategories as c}
					<li>
						<a
							class={`${c.category_slug == cat ? ' primary' : 'contrast'}`}
							href={['', BLOG_ROOT_URL, CATEGORY_ROOT_URL, c.category_slug].join('/')}
							><u><big>{c.category_title}</big></u>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>
</div>
<div>
	<hr />
</div>

<div class="container">
	<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
		{#each posts as post}
			<div class="col">
				{#if post.post_image}
					<a href={'/' + BLOG_ROOT_URL + '/' + post.post_slug}>
						<img
							src={post.post_image.image_url || ''}
							alt={post.post_image.image_title || post.post_title}
						/>
					</a>
				{/if}
				<div class="row justify-content-between">
					<small class="col">{timeSince(post.created_at)} ago</small>
					<nav class="col-auto">&nbsp;</nav>
				</div>
				<a href={'/' + BLOG_ROOT_URL + '/' + post.post_slug}>
					<h2>{post.post_title}</h2>
				</a>
			</div>
		{/each}
	</div>
	<Pagination {count} {current} {limit} />
</div>

<style lang="scss">
</style>
