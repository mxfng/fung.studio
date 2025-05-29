import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import { globalIgnores } from "eslint/config";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  {
    rules: {
      "astro/no-set-html-directive": "error",
    },
  },
  {
    files: ["scripts/**/*.js", "scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["public/scripts/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  globalIgnores(["dist/*", ".astro/*"]),
);
