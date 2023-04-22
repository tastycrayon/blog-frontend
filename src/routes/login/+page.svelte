<script lang="ts">
	import { LoginUserDocument } from '$lib/gql/generated';
	import { queryStore, getContextClient } from '@urql/svelte';
	import type { LoginUser, LoginUserVariables } from '$lib/gql/generated';
	import { setRefreshTokenExp, setAccessToken, type IAccessToken } from '$lib/client';
	import jwtDecode from 'jwt-decode';
	import { setUserState, userState } from '$lib/store';
	import { redirect } from '@sveltejs/kit';

	let emailOrUsername: string = '';
	let password: string = '';

	$: result = queryStore<LoginUser, LoginUserVariables>({
		client: getContextClient(),
		query: LoginUserDocument,
		variables: { emailOrUsername, password },
		pause: true
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
			requestPolicy: 'network-only'
		});
	};
	$: if (!$result.fetching && !$result.error && $result.data) {
		const access_token = $result.data.login?.access_token;
		const exp = $result.data.login?.exp;
		if (exp) setRefreshTokenExp(exp);
		if (access_token) {
			setAccessToken(access_token);
			const access_token_parsed = jwtDecode<IAccessToken>(access_token);
			setUserState(access_token_parsed);
		}
	}
</script>

{#if $result?.fetching}
	<p>Loading...</p>
{:else if $result?.error}
	<pre>{$result?.error}</pre>
{/if}

<div class="container">
	<form action="/login" method="post" on:submit|preventDefault={handleOnSubmit}>
		<input bind:value={emailOrUsername} type="text" name="email" id="email" />
		<br />
		<input bind:value={password} type="password" name="password" id="password" />
		<br />
		<input type="submit" value="submit" />
	</form>
</div>
