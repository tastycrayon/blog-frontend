<script lang="ts">
  import { LoginUserDocument } from "$lib/gql/generated";
  import { queryStore, getContextClient } from "@urql/svelte";
  import type { LoginUser, LoginUserVariables } from "$lib/gql/generated";
  import { setRefreshTokenExp, setAccessToken } from "$lib/client";

  let emailOrUsername: string = "admin";
  let password: string = "12345";

  $: result = queryStore<LoginUser, LoginUserVariables>({
    client: getContextClient(),
    query: LoginUserDocument,
    variables: { emailOrUsername, password },
    pause: true,
  });
  const handleOnSubmit = (): void => {
    // if paused then just exectue that
    if (result.isPaused$) return result.resume();
    // if nothing has changed then return

    // Or just re-execute 🚀🚀
    queryStore({
      client: getContextClient(),
      query: LoginUserDocument,
      variables: { emailOrUsername, password },
      requestPolicy: "network-only",
    });
    console.log("Called");
  };
  $: if (!$result.fetching && !$result.error && $result.data) {
    const access_token = $result.data.login?.access_token;
    const exp = $result.data.login?.exp;
    if (access_token) setAccessToken(access_token);
    if (exp) setRefreshTokenExp(exp);
  }
</script>

{#if $result?.fetching}
  <p>Loading...</p>
{:else if $result?.error}
  <pre>{$result?.error}</pre>
{:else if $result?.data}
  <p>{JSON.stringify($result.data)}</p>
{/if}

<div>
  <form action="/login" method="post" on:submit|preventDefault={handleOnSubmit}>
    <input bind:value={emailOrUsername} type="text" name="email" id="email" />
    <br />
    <input
      bind:value={password}
      type="password"
      name="password"
      id="password"
    />
    <br />
    <input type="submit" value="submit" />
  </form>
</div>
