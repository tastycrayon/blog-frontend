<script lang="ts">
	import '../styles/app.scss';
	import { initContextClient, setContextClient } from '@urql/svelte';
	import { client, clientOpts, getAccessToken, type IAccessToken } from '$lib/client';
	import Cursor from '$components/cursor.svelte';
	import {
		setCursorToDefault,
		setCursorToHamburger,
		setCursorToSlider,
		setUserState
	} from '$lib/store';
	import jwtDecode from 'jwt-decode';

	initContextClient(clientOpts);
	// setContextClient(client);
	const token = getAccessToken();
	const user = token ? jwtDecode<IAccessToken>(token) : null;
	setUserState(user);
</script>

<Cursor />
<slot />
<!-- <div class="container">
  <br /><br />
  <a
    href="/blog"
    role="button"
    class="primary"
    on:mouseenter={setCursorToHamburger}
    on:mouseleave={setCursorToDefault}>Primary</a
  >
  <br /><br />
  <a
    href="/"
    role="button"
    class="primary"
    on:dragstart={setCursorToSlider}
    on:dragend={setCursorToDefault}
  >
    Secondary
  </a>
</div> -->

<!-- svelte-ignore css-unused-selector -->
<!-- <style lang="scss">
  @import "src/style/style.scss";
</style> -->
