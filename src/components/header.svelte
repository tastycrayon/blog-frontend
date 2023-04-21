<script lang="ts">
	import Icons from '$components/icons.svelte';
	import { internalLinks } from '$lib/constants';
	import {
		DayNightStore,
		setCursorToDefault,
		setCursorToHamburger,
		setDayNightToggler,
		setDayToggler,
		setNightToggler
	} from '$lib/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const handleToggleDay = () => {
		if (!window) return;
		setDayNightToggler();
		document.documentElement.dataset.theme = 'light';
	};
	const handleToggleNight = () => {
		if (!window) return;
		setDayNightToggler();
		document.documentElement.dataset.theme = 'dark';
	};

	onMount(() => {
		const userPrefersColorMode = window.matchMedia('(prefers-color-scheme: light)').matches;
		if (userPrefersColorMode) setDayToggler();
		else setNightToggler();
	});
</script>

<nav class="container">
	<ul>
		<li><a href="/" class="contrast"><strong>Mosi</strong></a></li>
	</ul>
	<!-- phone -->
	<details role="list" class="d-inline d-lg-none my-auto">
		<summary aria-haspopup="listbox" role="button" class="contrast outline"> Menu </summary>
		<ul role="listbox">
			{#each internalLinks as links}
				<li><a href={links.url}>{links.component}</a></li>
			{/each}
			<li><a href="contact" role="button">Button</a></li>
		</ul>
	</details>
	<!-- phone end -->
	<ul
		class="d-none d-lg-inline"
		on:mouseenter={setCursorToHamburger}
		on:mouseleave={setCursorToDefault}
	>
		{#each internalLinks as item}
			<li>
				<a class={$page.url.pathname == item.url ? 'primary' : 'contrast'} href={item.url}
					>{item.component}</a
				>
			</li>
		{/each}
		{#if $DayNightStore}
			<li>
				<a href="/" on:click|preventDefault={handleToggleNight}> <Icons name="sun" /></a>
			</li>
		{:else}
			<li>
				<a href="/" on:click|preventDefault={handleToggleDay}><Icons name="moon" /></a>
			</li>
		{/if}
		<li><a href="contact" role="button">Button</a></li>
	</ul>
</nav>
<div>
	<hr class="mt-0" />
</div>

<style lang="scss">
	details ul {
		left: 100%;
		transform: translateX(-100%);
	}
</style>
