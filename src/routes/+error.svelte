<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="error">
  <h1>{$page.status}</h1>
  <img src="/sleeping-cat.png" alt="Surprised cat" />
  <p>{$page.error?.message}</p>
</div>

<style>
  .error {
    height: 100vh;
    display: grid;
    gap: var(--spacing-32);
    place-content: center;
    place-items: center;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
</style>
