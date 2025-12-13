<script lang="ts">
	import { setMenuToggler, MenuStore } from '$lib/store';
	import { onMount, onDestroy } from 'svelte';

	let short = true;
	let timeout: ReturnType<typeof setTimeout> | undefined;

	onMount(() => {
		timeout = setTimeout(() => {
			short = false;
		}, 1000);
	});

	onDestroy(() => {
		if (timeout) clearTimeout(timeout);
	});

	$: barClass = `menu-bar ${short ? 'short' : ''}`;
</script>

<div class="container position-relative">
	<div class={'menu-button-wrapper' + ($MenuStore ? ' open' : '')}>
		<button on:click={setMenuToggler} type="button" class="menu-button" aria-label="toggle menu">
			<span class={barClass}></span>
		</button>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/custom-variable.scss' as *;

	// line start
	.menu-button {
		position: relative;
		will-change: transform;
	}

	.menu-button::after {
		content: '';
		width: 56px;
		height: 2px;
		background-color: var(--pico-primary);
		display: block;
		position: absolute;
		top: 84px;
		left: 50%;
		transform: translate(-50%, -50%) rotate(90deg);
		display: none;
	}

	.open .menu-button::after {
		display: block;
		opacity: 1;
	}
	// line end

	@media screen and (min-width: 768px) {
		.menu-button-wrapper {
			& .menu-button {
				box-shadow: none;
			}
		}
	}

	.menu-button-wrapper {
		margin-left: calc(-0.5 * var(--bs-gutter-x));

		position: absolute;
		left: 11px;
		top: 0.5rem;
		z-index: 11;

		transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
		will-change: transform;

		& .menu-button {
			cursor: pointer;
			width: 48px;
			height: 48px;
			border: none;
			background: 0 0;
			display: block;

			transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
			will-change: transform;

			& span {
				&::before,
				&::after {
					content: '';
					width: 2px;
					height: 48px;
					position: absolute;
					background-color: var(--pico-primary);
					transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
					will-change: transform, background-color;
				}
				&::before {
					transform: translate(-5px, -50%) scaleY(0.7) rotate(180deg);
				}
				&::after {
					transform: translate(5px, -50%) scaleY(0.7) rotate(180deg);
				}
			}
		}

		&.open {
			transform: translateX(80px);
			transition-delay: 0.4s;

			& .menu-button {
				transform: rotate(90deg);
			}

			& span {
				&::before {
					transform: translate(-50%, -50%) rotate(315deg);
					background-color: white;
				}
				&::after {
					transform: translate(-50%, -50%) rotate(45deg);
					transition-delay: 0.2s;
					background-color: white;
				}
			}
		}
	}

	// menu-bar short state
	span.menu-bar.short::before,
	span.menu-bar.short::after {
		height: 15px;
		background-color: yellow !important;
		will-change: height, transform;
	}
</style>
