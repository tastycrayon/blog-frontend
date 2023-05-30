<script lang="ts">
	import { page } from '$app/stores';
	import { ICONS_LINKS, internalLinks } from '$lib/constants';
	import {
		DayNightStore,
		MenuStore,
		handleToggleDay,
		handleToggleNight,
		setCursorToDefault,
		setCursorToHamburger,
		setMenuHide
	} from '$lib/store';
	import { onDestroy } from 'svelte';
	import Cat from './cat.svelte';
	import Icons from '$components/icons.svelte';
	onDestroy(() => {
		setMenuHide();
	});
</script>

<nav class="menu-holder">
	<div class={'menu-inside' + ($MenuStore ? ' open' : '')}>
		<div class="menu-nav-container container">
			<div class="row">
				<div class="col-12 col-md-6">
					<ul class="menu-nav-links py-2">
						{#each internalLinks as item}
							<li
								id={item.component}
								on:mouseenter={setCursorToHamburger}
								on:mouseleave={setCursorToDefault}
							>
								<a class={$page.url.pathname == item.url ? 'contrast' : 'primary'} href={item.url}
									>{item.component}</a
								>
							</li>
						{/each}
						{#if $DayNightStore}
							<li>
								<a href="/" on:click|preventDefault={handleToggleNight}
									><Icons name="sun" width="32px" height="32px" />----</a
								>
							</li>
						{:else}
							<li>
								<a href="/" on:click|preventDefault={handleToggleDay}
									><Icons name="moon" width="32px" height="32px" />----</a
								>
							</li>
						{/if}
						<!-- icons  -->
						<li class="nav-icons-container">
							{#each ICONS_LINKS as item}
								<a title={item.name} href={item.url} target="_blank" rel="noopener noreferrer">
									<Icons class="menu-icon" name={item.name} width="32px" height="32px" />
								</a>
							{/each}
						</li>
						<!-- icons  -->
					</ul>
				</div>
				<div class="col-12 col-md-6">
					<div class="cat-container">
						<Cat />
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	@import 'src/styles/custom-variable.scss';
	.menu-holder {
		& .menu-inside {
			position: fixed;
			width: 100vw;
			height: 100vh;
			background: #111;
			z-index: 10;

			will-change: transform;
			transition: transform 1s cubic-bezier(1, 0, 0, 1);
			transform: translateX(-100%);

			& .menu-nav-container {
				margin-top: 100px;

				& .menu-nav-links {
					background-color: #111;
					[data-theme='light'] & {
						background-color: var(--background-color);
					}
					height: calc(100vh - 100px);
					@include mq('tablet', max) {
						height: calc(100vh - 200px);
					}
					display: flex;
					flex-direction: column;
					align-items: start;
					& li {
						margin-bottom: 0px;
						padding-top: 0;
						padding-bottom: 0;
						& a {
							font-size: clamp(16px, 4vw, 48px);
							transform: translate(-300%);
							transition: transform 0.8s cubic-bezier(0.55, 0.055, 0.675, 0.19);
							padding-top: 0;
							padding-bottom: 0;
						}
						&:hover a {
							font-weight: 700;
						}
					}
					@for $i from 0 through 4 {
						& li:nth-child(#{$i + 1}n) {
							& a {
								transition-delay: #{calc($i / 10) + 0.5}s;
							}
						}
					}
				}
				& .cat-container {
					width: 100%;
					margin: 1rem;
					display: flex;
					align-items: start;
					justify-content: center;
					// margin-top: 100px;
					@include mq('tablet', max) {
						display: none;
					}
				}
			}
			&.open {
				transform: translateX(0);
				.menu-nav-links li a {
					transform: translate(0);
				}
			}
		}

		// nav icons
		.nav-icons-container {
			margin-top: 2rem;
			transform: translate(-300%);
			transition: transform 0.8s cubic-bezier(0.55, 0.055, 0.675, 0.19);
			transition-delay: 0.8s;
			& > a {
				margin-right: 0.25rem;
				transform: rotate(-10deg);
				transition: rotate 3s linear;
				transition-delay: 1s;
			}
		}
		.open .nav-icons-container {
			transform: translateX(0);
			& a {
				transform: rotate(0deg);
				transition: transform 0.8s ease-out;
				// & svg.menu-icon {
				// 	stroke: var(--primary);
				// }
			}
		}
	}
</style>
