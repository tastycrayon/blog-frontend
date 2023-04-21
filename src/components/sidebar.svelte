<script lang="ts">
  import type { Category } from "$lib/gql/generated";

  export let categories: Category[];
</script>

<aside class="col col-md-12 col-lg-3">
  <h3>Categories</h3>
  <ul>
    {#each categories as cat}
      <li>
        <a class="contrast" href={"blog/" + cat.category_slug}
          ><u><big>{cat.category_title}</big></u>
        </a>
      </li>
    {/each}
  </ul>
</aside>
