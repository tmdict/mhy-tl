import adapter from "@sveltejs/adapter-static";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { load } from "js-yaml";
import { defineConfig } from "vite";

// Imports .yml files as plain data modules
const yaml = () => ({
  name: "yaml",
  transform(code, id) {
    if (!/\.ya?ml$/.test(id)) return null;
    return { code: `export default ${JSON.stringify(load(code, { filename: id }))};`, map: null };
  },
});

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      adapter: adapter(),
    }),
    yaml(),
  ],
});
