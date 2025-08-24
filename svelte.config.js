import { fileURLToPath, URL } from "url";
import { sveltePreprocess } from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)), // alias to data
      "@store": fileURLToPath(new URL("./src/stores", import.meta.url)), // alias to stores
    },
  },
  preprocess: sveltePreprocess(),
};

export default config;
