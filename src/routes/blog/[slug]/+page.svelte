<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<h1>{data.post?.post_title}</h1>
<p>{data.post?.post_content}</p>
