import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["@urql/svelte"],
  },

  resolve: {
    alias: {
      $components: path.resolve("./src/components"),
      $lib: path.resolve("./src/lib"),
    },
  },
};

export default config;
