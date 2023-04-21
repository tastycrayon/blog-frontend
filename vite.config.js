import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import glsl from 'vite-plugin-glsl';
/** @type {import('vite').UserConfig} */

export default defineConfig({
	plugins: [sveltekit(), glsl()],
	optimizeDeps: {
		exclude: ['@urql/svelte']
	},

	resolve: {
		alias: {
			$components: path.resolve('./src/components'),
			$lib: path.resolve('./src/lib')
		}
	}
});
