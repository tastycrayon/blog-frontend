<script>
	import CanvasAlt from '$components/canvas-alt.svelte';
	import MenuBtn from '$components/menu/menu-btn.svelte';
	import MenuContent from '$components/menu/menu-content.svelte';
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
						<big>A passionate fullstack developer <br />living in Bangladesh</big>
						<div>
							<a role="button" href="projects" class="my-2 w-auto"><span>See My Work</span> +</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	h1,
	big {
		color: white;
	}
	.wrapper {
		// background-image: url('index-banner.jpg');
		background-image: url('background.jpeg');
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

	// .main-container {
	//   position: relative;
	//   height: 100vh;
	//   width: calc(100vw - 50px);
	//   display: flex;
	//   align-items: flex-end;
	//   margin: 0 auto;
	//   h1 {
	//     font-size: clamp(64px, 8vw, 15vw);
	//     max-width: 70vw;
	//     margin-bottom: 10vh;
	//     margin-left: 1rem;
	//     color: #111;
	//   }
	//   @include mq("tablet", min) {
	//     margin-left: 75px;
	//     padding-left: 50px;
	//     border-left: 1px solid #111;
	//     width: calc(100vw - 126px);
	//   }
	// }
</style>
