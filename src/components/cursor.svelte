<script lang="ts">
	import { CursorStore, CursorTypes } from '$lib/store';
	import { onMount, onDestroy } from 'svelte';
	let mainCursor: HTMLDivElement | null = null;
	const mainCursorRadius = 15;

	let secondaryCursor: HTMLDivElement | null = null;
	const secondaryCursorRadius = 40;
	const mousePositionMDetail = {
		mouseX: 0,
		mouseY: 0,
		destinationX: 0,
		destinationY: 0,
		distanceX: 0,
		distanceY: 0,
		key: -1
	};
	const handleMouseMove = (event: MouseEvent) => {
		if (!mainCursor) return;
		const mouseX = event.clientX - mainCursorRadius;
		const mouseY = event.clientY - mainCursorRadius;
		mainCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

		mousePositionMDetail.mouseX = event.clientX - secondaryCursorRadius;
		mousePositionMDetail.mouseY = event.clientY - secondaryCursorRadius;
	};
	const followMouse = () => {
		mousePositionMDetail.key = requestAnimationFrame(followMouse);
		const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } =
			mousePositionMDetail;
		if (!destinationX || !destinationY) {
			mousePositionMDetail.destinationX = mouseX;
			mousePositionMDetail.destinationY = mouseY;
		} else {
			mousePositionMDetail.distanceX = (mouseX - destinationX) * 0.3;
			mousePositionMDetail.distanceY = (mouseY - destinationY) * 0.3;
			if (
				Math.abs(mousePositionMDetail.distanceX) + Math.abs(mousePositionMDetail.distanceY) <
				0.1
			) {
				mousePositionMDetail.destinationX = mouseX;
				mousePositionMDetail.destinationY = mouseY;
			} else {
				mousePositionMDetail.destinationX += distanceX;
				mousePositionMDetail.destinationY += distanceY;
			}
		}
		if (!secondaryCursor) return;
		secondaryCursor.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
	};
	onMount(followMouse);
	// followMouse();
	//   if (window != undefined) followMouse();

	let cursorDesign: CursorTypes = CursorTypes.default;
	const unsubscribe = CursorStore.subscribe((c) => (cursorDesign = c));

	onDestroy(unsubscribe);
</script>

<div class={cursorDesign}>
	<div class={`main-cursor`} bind:this={mainCursor}>
		<div class="main-cursor-background" />
	</div>
	<div class="secondary-cursor" bind:this={secondaryCursor}>
		<div class="secondary-cursor-background">
			<div class="secondary-cursor-background" />
		</div>
	</div>
</div>
<svelte:window on:mousemove={handleMouseMove} />

<style lang="scss">
	.main-cursor {
		position: fixed;
		mix-blend-mode: difference;
		pointer-events: none;
		z-index: 1000;
		& > .main-cursor-background {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background-color: white;
			transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1);
			transform: translate3d(0, 0, 0);
			transform-origin: center;
			animation: scaleDown 0.7s cubic-bezier(0.77, 0, 0.175, 1);
		}
	}
	.secondary-cursor {
		width: 80px;
		height: 80px;
		position: fixed;
		pointer-events: none;
		z-index: 1000;
		& > .secondary-cursor-background {
			width: 100%;
			height: 100%;
			position: relative;
			border: 0.5px solid var(--contrast-hover);
			border-radius: 50%;
			transform: translate3d(0, 0, 0);
			animation: fadeIn 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
			&:after,
			&:before {
				content: '';
				width: 3px;
				height: 3px;
				border-radius: 50%;
				background: var(--contrast-inverse);
				display: block;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				animation: fadeOut 0.75s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
			}
			&:before {
				left: 10px;
			}

			&:after {
				right: 10px;
			}
		}
	}
	@media only screen and (max-width: 700px) {
		.main-cursor,
		.secondary-cursor {
			display: none;
		}
	}
	.sliderDrag {
		& .secondary-cursor-background {
			opacity: 0.5;
			animation: scaleUp 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards,
				bgUp 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;

			&:after {
				animation: fadeIn 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards,
					translateRightDot 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
			}

			&:before {
				animation: fadeIn 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards,
					translateLeftDot 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
			}
		}
		& .main-cursor-background {
			animation: fadeOut 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
		}
	}
	.hamburger {
		& .main-cursor-background {
			animation: scaleUp 0.7s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
		}
		& .secondary-cursor-background {
			animation: fadeOut 1s cubic-bezier(0.77, 0, 0.175, 1) 0s forwards;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes scaleUp {
		from {
			transform: scale(1);
		}

		to {
			transform: scale(1.5);
		}
	}

	@keyframes scaleDown {
		from {
			transform: scale(1.5);
		}

		to {
			transform: scale(1);
		}
	}

	@keyframes translateLeftDot {
		from {
			transform: translate(20px, -50%);
		}

		to {
			transform: translate(0px, -50%);
		}
	}

	@keyframes translateRightDot {
		from {
			transform: translate(-20px, -50%);
		}

		to {
			transform: translate(0px, -50%);
		}
	}
	@keyframes bgUp {
		from {
			background-color: transparent;
		}

		to {
			background-color: var(--contrast-hover);
		}
	}

	@keyframes bgDown {
		from {
			background-color: var(--contrast-hover);
		}

		to {
			background-color: transparent;
		}
	}
</style>
