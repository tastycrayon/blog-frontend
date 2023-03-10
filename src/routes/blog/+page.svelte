<script lang="ts">
  import { queryStore, getContextClient } from "@urql/svelte";
  import { GetPostsDocument } from "$lib/gql/generated";
  import type { GetPosts, GetPostsVariables } from "$lib/gql/generated";
  import { onMount } from "svelte";

  $: posts = queryStore<GetPosts, GetPostsVariables>({
    client: getContextClient(),
    query: GetPostsDocument,
    variables: { limit: 15, offset: 0, orderBy: "" },
  });
</script>

<div class="container-sm">100% wide until small breakpoint</div>
<div class="container-md">100% wide until medium breakpoint</div>
<div class="container-lg">100% wide until large breakpoint</div>
<div class="container-xl">100% wide until extra large breakpoint</div>
<div class="container-xxl">100% wide until extra extra large breakpoint</div>

<header class="container">
  <hgroup>
    <h1>Company</h1>
    <h2>A classic company or blog layout with a sidebar</h2>
  </hgroup>
  <p>
    <a href="/" role="button">Call to action</a>
  </p>
</header>

<main class="container">
  <div class="row">
    <section class="posts col-12 col-lg-8">
      {#if $posts.fetching}
        <p>Loading...</p>
      {:else if $posts.error}
        <pre>{$posts.error}</pre>
        {JSON.stringify($posts.error.message)}
      {:else if !$posts.data}
        <p>No posts</p>
      {:else}
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {#each $posts.data.getPosts as post}
            <article id="slide-item" class="col">
              <figure>
                <img
                  src={post.post_image?.image_url || ""}
                  alt={post.post_image?.image_title || post.post_title}
                />
                <h2>{post.post_title}</h2>
                <a href={`blog/` + post.post_slug} role="button" class="primary"
                  >Read More</a
                >
              </figure>
            </article>
          {/each}
        </div>
      {/if}
    </section>
    <aside class="sidebar col-12 col-lg-4">
      <h3>Categories</h3>
      <ul>
        <li>Aliquam lobortis lacus eu libero ornare facilisis.</li>
        <li>Nam et magna at libero scelerisque egestas.</li>
        <li>Suspendisse id nisl ut leo finibus vehicula quis eu ex.</li>
        <li>Proin ultricies turpis et volutpat vehicula.</li>
      </ul>
    </aside>
    <div>
      <footer>
        <small>Duis nec elit placerat, suscipit nibh quis, finibus neque.</small
        >
      </footer>
    </div>
  </div>
</main>

<style lang="scss">
  .posts {
    & article {
      & img {
        max-width: 100%;
      }
    }
  }
  .sidebar {
    & li {
      display: list-item;
      list-style: square;
    }
  }
</style>
