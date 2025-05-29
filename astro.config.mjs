// @ts-check
import { defineConfig } from "astro/config";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "./src",
        ),
      },
    },
  },
});
