<script>
	import CanvasAlt from '$components/canvas-alt.svelte';
	import MenuBtn from '$components/menu/menu-btn.svelte';
	import MenuContent from '$components/menu/menu-content.svelte';
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
							Hi, I'm<br />Mosiur Rahman
						</h1>
						<big>A Bengali full-stack dev<br />with a lot of dedication</big>
						<div>
							<a
								role="button"
								href="projects"
								class="my-2 w-auto primary outline"
								on:mouseenter={setCursorToHamburger}
								on:mouseleave={setCursorToDefault}><span>See My Work</span> +</a
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
	h1,
	big {
		color: white;
	}
	.wrapper {
		// background-image: url('index-banner.jpg');
		background-image: url('https://res.cloudinary.com/mosiur404/image/upload/v1682134612/blog/background_tx2tmp.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		& .wrapper-overlay {
			background: linear-gradient(to right, rgba(0, 0, 0, 0.73), rgba(0, 0, 0, 0));
		}
	}
	// mixin
	@import 'src/styles/custom-variable.scss';
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
