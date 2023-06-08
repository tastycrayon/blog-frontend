<script lang="ts">
	import { timeSince } from '$lib/util';
	import { BLOG_ROOT_URL, CATEGORY_ROOT_URL, PAGINATION_KEY } from '$lib/constants';
	import type { PageData } from './$types';
	import Pagination from '$components/pagination.svelte';
	export let data: PageData;
	$: ({ posts, allTags, count, tag: currentTag } = data);
	$: ({
		pagination: { current, limit }
	} = data);
</script>

<!-- OPENGRAPH -->
<svelte:head>
	<meta property="og:title" content="CATEGORY BLOG | MOSI" />
	<!-- <meta property="og:description" content="A Bengali full-stack dev with a lot of dedication" /> -->
	<meta
		property="og:image"
		content="https://res.cloudinary.com/mosiur404/image/upload/v1682434985/blog/opengraph_jk0diq.png"
	/>
</svelte:head>
<!-- OPENGRAPH -->
<div class="container">
	<header>
		<h1 class="mb-0">Mosi's Blog</h1>
		<nav>
			<ul>
				{#each allTags as tag}
					<li>
						<a
							class={`${tag.slug == currentTag.slug ? ' primary' : 'contrast'}`}
							href={[BLOG_ROOT_URL, CATEGORY_ROOT_URL, '/', tag.slug].join('')}
							><u><big>{tag.title}</big></u>
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
				{#if post.cover}
					<a href={[BLOG_ROOT_URL, '/', post.slug].join('')}>
						<img src={post.cover || ''} alt={post.title} />
					</a>
				{/if}
				<div class="row justify-content-between">
					<small class="col">{timeSince(Date.parse(post.created))} ago</small>
					<nav class="col-auto">&nbsp;</nav>
				</div>
				<a href={[BLOG_ROOT_URL, '/', post.slug].join('')}>
					<h2>{post.title}</h2>
				</a>
			</div>
		{/each}
	</div>
	<Pagination {count} {current} {limit} />
</div>

<style lang="scss">
</style>
