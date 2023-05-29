// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}
declare global {
	// for canvas
	interface Document {
		mozCancelFullScreen?: () => Promise<void>;
		msExitFullscreen?: () => Promise<void>;
		webkitExitFullscreen?: () => Promise<void>;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;
		webkitFullscreenElement?: Element;
	}

	interface HTMLElement {
		msRequestFullscreen?: () => Promise<void>;
		mozRequestFullscreen?: () => Promise<void>;
		webkitRequestFullscreen?: () => Promise<void>;
	}
	// for canvas end
	namespace App {
		interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').default['authStore']['model'];
		}
		// interface PageData {}
		// interface Platform {		}
	}
}

export {};
