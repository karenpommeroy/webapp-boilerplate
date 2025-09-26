import jsonc from "eslint-plugin-jsonc";
import react from "eslint-plugin-react";
import globals from "globals";
import jsoncParser from "jsonc-eslint-parser";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {FlatCompat} from "@eslint/eslintrc";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

import type {ESLint, Linter} from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

const config: Linter.Config[] = [
    ...compat.extends("eslint:recommended"),
    {
        ignores: ["./.yarn/", "node_modules/", "/dist", ".pnp.*", "prettier.config.js"],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        ignores: [".yarn/", "node_modules/", "/dist", ".pnp.*"],
        plugins: {
            "@typescript-eslint": typescriptEslint as any,
            react,
            typeScript: typescriptEslint as any,
            "@stylistic": stylistic,
            prettier: require("eslint-plugin-prettier"),
        },
        basePath: __dirname,
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        settings: {
            react: {version: "detect"},
        },
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: "off",
            "linebreak-style": "off",
            "no-multiple-empty-lines": ["error", {max: 1, maxEOF: 1, maxBOF: 0}],
            "no-unused-vars": "off",
            "function-paren-newline": "off",
            "function-call-argument-newline": "off",

            // Prettier formatting rules
            "prettier/prettier": ["error"],

            // ✅ Stylistic formatting rules
            "@stylistic/indent": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["warn", "always"],
            "@stylistic/linebreak-style": ["warn", "windows"],
            "@stylistic/max-len": ["warn", {code: 160}],
            "@stylistic/function-paren-newline": "off",
            "@stylistic/function-call-argument-newline": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@stylistic/no-multiple-empty-lines": ["error", {max: 1, maxEOF: 1, maxBOF: 0}],
        },
    },
    {
        files: [["**/*.json", "!package.json"]],
        plugins: {jsonc: jsonc as unknown as ESLint.Plugin},
        languageOptions: {
            parser: jsoncParser,
        },
        rules: {
            "no-multiple-empty-lines": ["error", {max: 0, maxEOF: 1, maxBOF: 0}],
            "jsonc/indent": ["error", 2],
            "jsonc/sort-keys": ["error", "asc", {caseSensitive: true}],
        },
    },
    {
        files: ["package.json"],
        plugins: {jsonc: jsonc as unknown as ESLint.Plugin},
        languageOptions: {
            parser: jsoncParser,
        },
        rules: {
            "jsonc/sort-keys": "off",
            "jsonc/indent": ["error", 2],
        },
    },
];

export default config;
