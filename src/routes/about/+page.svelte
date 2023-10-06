<script>
	import Icons from '$components/icons.svelte';
	import { ICONS_LINKS } from '$lib/constants';
</script>

<svelte:head>
	<meta property="og:title" content="Home | MOSI" />
	<meta
		property="og:description"
		content="A Bengali full-stack dev
	with a lot of dedication"
	/>
	<meta
		property="og:image"
		content="https://res.cloudinary.com/mosiur404/image/upload/v1682434985/blog/opengraph_jk0diq.png"
	/>
</svelte:head>

<div class="container">
	<header>
		<h1 class="mb-0">About Me</h1>
		<nav>
			<ul>
				{#each ICONS_LINKS as icon}
					<li>
						<a class="contrast" href={icon.url} target="_blank" rel="noopener noreferrer"
							><Icons name={icon.name} width="24px" height="24px" /></a
						>
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
	<div class="row">
		<div class="col-12 col-lg-6">
			<div class="img-box my-3">
				<img
					src="https://res.cloudinary.com/mosiur404/image/upload/w_440/v1696619233/blog/sq7cuqvr79aqucdlytbk.jpg"
					alt="mypic"
				/>
			</div>
		</div>
		<div class="col-12 col-lg-6">
			<details open>
				<!-- svelte-ignore a11y-no-redundant-roles -->
				<summary role="button" class="outline">About Me</summary>
				<p>
					<big>F</big>ocused and enthusiastic developer with a keen interest in software development
					and artificial intelligence. By comprehensive exposure to the underlying concepts and
					applying them vividly to various projects, my love for these domains came into being.
					<br /> I am a passionate individual who thrives to build and apply algorithms to solve real-world
					industry problems.
				</p>
			</details>
			<details>
				<!-- svelte-ignore a11y-no-redundant-roles -->
				<summary role="button" class="outline">Skills</summary>
				<i>- Languages</i>
				<ul>
					<li>Confident: [Go, PHP, CPP, TS, JS, HTML-CSS]</li>
					<li>Familiar: [Python, Rust]</li>
				</ul>
				<i>- Backend</i>
				<ul>
					<li>Gqlgen, Fiber, WordPress</li>
					<li>Apollo, ExpressJS</li>
					<li>MySQL, MongoDB, GraphQL</li>
				</ul>
				<i>- Frontend</i>
				<ul>
					<li>Svelte, SvelteKit, ReactJS, NextJS</li>
					<li>Bootstrap, Tailwind, Material-UI</li>
				</ul>
			</details>
			<details>
				<!-- svelte-ignore a11y-no-redundant-roles -->
				<summary role="button" class="outline">Education</summary>
				<ul>
					<li>B. SC in Computer Science & Engineering</li>
					<li>CGPA 3.54/4.0 | PCIU Chittagong | Sep 2022</li>
				</ul>
			</details>
			<details>
				<!-- svelte-ignore a11y-no-redundant-roles -->
				<summary role="button" class="outline">Links</summary>
				<ul>
					{#each ICONS_LINKS as icon}
						<li>
							<a class="contrast" target="_blank" rel="noopener noreferrer" href={icon.url}
								><i>{icon.component}</i>
							</a>
						</li>
					{/each}
				</ul>
			</details>
		</div>
	</div>
</div>

<style lang="scss">
	.img-box {
		& img {
			padding: 1rem;
			border-radius: 50% 10% / 25%;
			border-bottom-right-radius: 10% / 25%;

			object-fit: cover;
			filter: grayscale(1);
			border: 1px solid var(--primary);
			transition: filter 0.3s linear, border-radius 0.3s ease;
			&:hover {
				border-radius: 10% / 25% 50%;
				filter: grayscale(0);
			}
		}
	}
</style>
