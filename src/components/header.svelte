<script lang="ts">
	import Icons from '$components/icons.svelte';
	import { MenuButton, internalLinks } from '$lib/constants';
	import {
		DayNightStore,
		handleToggleDay,
		handleToggleNight,
		setCursorToDefault,
		setCursorToHamburger,
		setDayNightToggler,
		setDayToggler,
		setNightToggler,
		userState
	} from '$lib/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		const userPrefersColorMode = window.matchMedia('(prefers-color-scheme: light)').matches;
		if (userPrefersColorMode) setDayToggler();
		else setNightToggler();
	});
</script>

<nav class="container">
	<ul>
		<li>
			<a href="/" class="contrast"
				><img src="/logo.svg" alt="logo" width="32px" height="auto" /> <strong>Mosi</strong></a
			>
		</li>
	</ul>
	<!-- phone -->
	<div class="d-inline-flex d-lg-none">
		<ul class="me-2">
			{#if $DayNightStore}
				<li>
					<a href="/" on:click|preventDefault={handleToggleNight}> <Icons name="sun" /></a>
				</li>
			{:else}
				<li>
					<a href="/" on:click|preventDefault={handleToggleDay}><Icons name="moon" /></a>
				</li>
			{/if}
		</ul>
		<details role="list" class="d-inline my-auto">
			<summary aria-haspopup="listbox" role="button" class="contrast outline"> Menu </summary>
			<ul role="listbox">
				{#each internalLinks as links}
					<li><a href={links.url}>{links.component}</a></li>
				{/each}
				<li><a href="contact" role="button">Button</a></li>
			</ul>
		</details>
	</div>
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
		{#if $userState}
			<li>ACCOUNT</li>
		{/if}
		{#if $DayNightStore}
			<li>
				<a href="/" on:click|preventDefault={handleToggleNight}> <Icons name="sun" /></a>
			</li>
		{:else}
			<li>
				<a href="/" on:click|preventDefault={handleToggleDay}><Icons name="moon" /></a>
			</li>
		{/if}
		<li><a href={MenuButton.url} role="button">{MenuButton.component}</a></li>
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
