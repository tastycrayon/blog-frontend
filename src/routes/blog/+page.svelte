<script lang="ts">
	import { timeSince } from '$lib/util';
	import { BLOG_ROOT_URL, CATEGORY_ROOT_URL } from '$lib/constants';

	import type { PageData } from './$types';
	import Pagination from '$components/pagination.svelte';
	import { setCursorToDefault, setCursorToHamburger } from '$lib/store';
	export let data: PageData;
	$: ({ posts, allTags, count } = data);
	$: ({
		pagination: { current, limit }
	} = data);
</script>

<!-- OPENGRAPH -->
<svelte:head>
	<title>Blog - Mosi</title>
	<meta property="og:title" content="BLOG | MOSI" />
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
						<a class="contrast" href={[BLOG_ROOT_URL, CATEGORY_ROOT_URL, '/', tag.slug].join('')}
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
	<div class="row g-4">
		{#each posts as post}
			<div class="col-12 col-md-6 col-lg-4">
				{#if post.thumb}
					<a
						href={[BLOG_ROOT_URL, '/', post.slug].join('')}
						on:mouseenter={setCursorToHamburger}
						on:mouseleave={setCursorToDefault}
					>
						<img class="w-100" src={post.thumb || ''} alt={post.title} />
					</a>
				{/if}
				<div class="row justify-content-between">
					<small class="col">{timeSince(Date.parse(post.created))} ago</small>
					<nav class="col-auto">
						{#if post.tags}
							{#each post.tags as tag}
								{#if typeof tag === 'object'}
									<a
										class="contrast col p-0 m-0"
										href={[BLOG_ROOT_URL, CATEGORY_ROOT_URL, '/', tag.slug].join('')}
										title={tag.description}
									>
										<u class="p-1"><small>{tag.title}</small></u>
									</a>
								{/if}
							{/each}
						{/if}
					</nav>
				</div>
				<a
					href={[BLOG_ROOT_URL, '/', post.slug].join('')}
					on:mouseenter={setCursorToHamburger}
					on:mouseleave={setCursorToDefault}
				>
					<h2 class="mb-2">{post.title}</h2>
				</a>
			</div>
		{/each}
	</div>
	<div class="my-2">
		<Pagination {count} {current} {limit} />
	</div>
</div>
