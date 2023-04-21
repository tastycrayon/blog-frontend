<script lang="ts">
	export let title = '';
	export let items = [
		{ name: 'HOME', url: '/' },
		{ name: 'BlOG', url: '/blog' }
	];
</script>

<nav class="container">
	<ul>
		{#each items as item}
			<li class="py-0">
				<a class="contrast" href={item.url}><small>{@html item.name} &rarr;</small></a>
			</li>
		{/each}
		<li class="py-0">
			<small class="secondary">{title}</small>
		</li>
	</ul>
</nav>
