import ViteYaml from "@modyfi/vite-plugin-yaml";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit(),
    ViteYaml(), // For loading yml
    devtoolsJson(),
  ],
  server: { fs: { allow: ["data"] } },
});
