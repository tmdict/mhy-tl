import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';
import { fileURLToPath, URL } from 'url';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)), // alias to data
      '@store': fileURLToPath(new URL('./src/stores', import.meta.url)) // alias to stores
    }
  },
  preprocess: sveltePreprocess()
};

export default config;
