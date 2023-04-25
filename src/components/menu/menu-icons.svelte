<script lang="ts">
	import Icons from '$components/icons.svelte';
	import { ICONS_LINKS } from '$lib/constants';
</script>

<!-- ICONS  -->
<li class="nav-icons-container">
	{#each ICONS_LINKS as item}
		<a title={item.name} href={item.url}
			><Icons class="menu-icon" name={item.name} width="32px" height="32px" /></a
		>
	{/each}
</li>

<!-- icons  -->

<!-- svelte-ignore css-unused-selector -->
<style lang="scss" global>
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
			& svg.menu-icon {
				stroke: var(--primary);
			}
		}
	}
</style>
