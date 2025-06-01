// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			tailwindcss(),
			cjsInterop({
				dependencies: ["flubber"],
			}),
		],

		resolve: {
			alias: {
				"@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
			},
		},
	},
	site: "https://maxfung.net",
	integrations: [react(), sitemap()],
});
