<script lang="ts">
	import { PROJECTS_ROOT_URL } from '$lib/constants';
	import { setCursorToDefault, setCursorToHamburger } from '$lib/store';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ allProjects } = data);
	$: projects = allProjects.filter((e) => !e.is_side_project);
	$: side_projects = allProjects.filter((e) => e.is_side_project);
</script>

<svelte:head>
	<title>Projects - Mosi</title>
	<meta property="og:title" content="HOME | MOSI" />
	<meta property="og:description" content="A Bengali full-stack dev with a lot of dedication" />
	<meta
		property="og:image"
		content="https://res.cloudinary.com/mosiur404/image/upload/v1682434985/blog/opengraph_jk0diq.png"
	/>
</svelte:head>
<div class="container">
	<header>
		<h1 class="mb-0">Mosi's Projects</h1>
		<ul>
			<li>
				<a class="contrast" href="https://github.com/tastycrayon"
					><u><small>github.com/tastycrayon</small></u>
				</a>
			</li>
			<li>
				<a class="contrast" href="https://www.upwork.com/freelancers/~01816d245683177af1"
					><u><small>upwork.com/freelancers/~01816d245683177af1</small></u>
				</a>
			</li>
		</ul>
	</header>
</div>
<div>
	<hr />
</div>
<div class="container">
	<div class="py-2">
		<!-- <big><i>Main Projects</i></big> -->
	</div>
	<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
		{#each projects as p}
			<div class="col">
				{#if p.cover}
					<a
						href={[PROJECTS_ROOT_URL, '/', p.slug].join('')}
						on:mouseenter={setCursorToHamburger}
						on:mouseleave={setCursorToDefault}
					>
						<img src={p.cover || ''} alt={p.title} />
						<div class="overlay" />
					</a>
				{/if}
				<a
					href={[PROJECTS_ROOT_URL, '/', p.slug].join('')}
					on:mouseenter={setCursorToHamburger}
					on:mouseleave={setCursorToDefault}
				>
					<h2 class="mt-2 mb-1">{p.title}</h2>
				</a>
				<small>{@html p.excerpt}</small>
			</div>
		{/each}
	</div>
</div>
<!-- side projects  -->
<div><hr /></div>
<div class="container">
	<div class="py-2">
		<!-- <big><i>Side Projects</i></big> -->
	</div>
	<div class="row g-4">
		{#each side_projects as sp}
			<div class="col-12 col-md-6 col-lg-4">
				{#if sp.cover}
					<a href={[PROJECTS_ROOT_URL, '/', sp.slug].join('')}>
						<img src={sp.cover} alt={sp.title} />
						<div class="overlay" />
					</a>
				{/if}
				<a href={[PROJECTS_ROOT_URL, '/', sp.slug].join('')}>
					<h2 class="mt-2 mb-1">{sp.title}</h2>
				</a>
				<small>{@html sp.excerpt}</small>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.row a {
		position: relative;
		display: block;
		& img {
			object-fit: cover;
			aspect-ratio: 16/9;
		}
	}
	.row .overlay {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.73);
	}
</style>
