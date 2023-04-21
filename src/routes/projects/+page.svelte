<script lang="ts">
	import { PROJECTS_ROOT_URL } from '$lib/constants';
	import { PROJECTS, SIDE_PROJECTS } from './data';
</script>

<div class="container">
	<header>
		<h1 class="mb-0">Mosi's Projects</h1>
		<nav>
			<ul>
				<li>
					<a class="contrast" href="/projects"><u><big>Some Side Projects</big></u> </a>
				</li>
			</ul>
		</nav>
	</header>
</div>
<div>
	<hr />
</div>
<div class="container">
	<div class="py-2">
		<big><i>Main Projects</i></big>
	</div>
	<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
		{#each PROJECTS as p}
			<div class="col">
				{#if p.post_image}
					<a href={PROJECTS_ROOT_URL + '/' + p.post_slug}>
						<img
							src={p.post_image.image_url || ''}
							alt={p.post_image.image_title || p.post_title}
						/>
						<div class="overlay" />
					</a>
				{/if}
				<a href={PROJECTS_ROOT_URL + '/' + p.post_slug}>
					<h2 class="mt-2 mb-1">{p.post_title}</h2>
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
		<big><i>Side Projects</i></big>
	</div>
	<div class="row g-4">
		{#each SIDE_PROJECTS as sp}
			<div class="col-12 col-md-6 col-lg-4">
				{#if sp.post_image}
					<a href={PROJECTS_ROOT_URL + '/' + sp.post_slug}>
						<img
							src={sp.post_image.image_url || ''}
							alt={sp.post_image.image_title || sp.post_title}
						/>
						<div class="overlay" />
					</a>
				{/if}
				<a href={PROJECTS_ROOT_URL + '/' + sp.post_slug}>
					<h2 class="mt-2 mb-1">{sp.post_title}</h2>
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
