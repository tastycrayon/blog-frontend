<script lang="ts">
	import { PROJECTS_ROOT_URL } from '$lib/constants';
	import type { ITag } from '$lib/types';

	export let categories: ITag[];
</script>

<aside class="col col-md-12 col-lg-3">
	<h3>Categories</h3>
	<ul>
		{#each categories as cat}
			<li>
				<a class="contrast" href={PROJECTS_ROOT_URL + '/' + cat.slug}
					><u><big>{cat.title}</big></u>
				</a>
			</li>
		{/each}
	</ul>
</aside>
