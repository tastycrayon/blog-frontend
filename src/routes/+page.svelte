<script>
	import CanvasAlt from '$components/canvas.svelte';
	import MenuBtn from '$components/menu/menu-btn.svelte';
	import MenuContent from '$components/menu/menu-content.svelte';
	import { PROJECTS_ROOT_URL } from '$lib/constants';
	import { setCursorToDefault, setCursorToHamburger } from '$lib/store';
</script>

<MenuBtn />
<MenuContent />
<div class="wrapper">
	<div class="wrapper-overlay">
		<div class="container vh-100">
			<div class="row h-100 flex-md-row-reverse">
				<div class="col-12 col-md-6 column">
					<CanvasAlt />
				</div>
				<div class="col-12 col-md-6 d-flex align-items-start align-items-md-center column">
					<div class="hgroup">
						<h1 class="mb-1">
							Hi, I'm Markus
						</h1>
						<big>Software engineer focused on <br/>thoughtful design & solid engineering.</big>
						<div>
							<a
								role="button"
								href={PROJECTS_ROOT_URL}
								class="my-4 w-auto primary outline"
								on:mouseenter={setCursorToHamburger}
								on:mouseleave={setCursorToDefault}><span>Check My Projects</span> +</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- OPENGRAPH -->
<svelte:head>
	<title>Home - Mosi</title>
	<meta property="og:title" content="HOME | MOSI" />
	<meta property="og:description" content="A Bengali full-stack dev with a lot of dedication" />
	<meta
		property="og:image"
		content="https://res.cloudinary.com/mosiur404/image/upload/v1682434985/blog/opengraph_jk0diq.png"
	/>
</svelte:head>

<!-- OPENGRAPH -->

<style lang="scss">
	// mixin
	@use '$lib/styles/custom-variable.scss' as *;
	h1,
	big {
		// color: white;
	}
	:global(html[data-theme="light"]) .wrapper {
		background-image: url('bg-light.webp');
		.wrapper-overlay {
			background: linear-gradient(to right, rgba(242, 255, 231, 0.73), rgba(105, 105, 105, 0.34));
		}
	}
	.wrapper {
		background-image: url('bg-dark.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		.wrapper-overlay {
			background: linear-gradient(to right, rgba(0, 0, 0, 0.73), rgba(0, 0, 0, 0));
		}
	}


	h1 {
		font-size: clamp(32px, 24px, 128px);
		@include mq('tablet', min) {
			font-size: clamp(48px, 2vw, 15vw);
		}
	}
	.column {
		height: 50%;
		@include mq('tablet', min) {
			height: 100%;
		}
	}
</style>
