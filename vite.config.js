import ViteYaml from "@modyfi/vite-plugin-yaml";
import adapter from "@sveltejs/adapter-static";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      adapter: adapter(),
    }),
    ViteYaml(), // For loading yml
  ],
  server: { fs: { allow: ["data"] } },
});
