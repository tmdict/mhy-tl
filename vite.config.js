import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import ViteYaml from "@modyfi/vite-plugin-yaml";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit(),
    ViteYaml(), // For loading yml
  ],
  server: {
    fs: {
      allow: ["data"],
    },
  },
});
