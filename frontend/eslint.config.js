import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginHooks from "eslint-plugin-react-hooks";
import pluginRefresh from "eslint-plugin-react-refresh";
import prettier from 'eslint-config-prettier';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["dist", "coverage"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginRefresh.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": pluginHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      ...pluginHooks.configs.recommended.rules,
    },
  },
  prettier,
];
