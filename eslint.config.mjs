import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("airbnb-base"), {
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 13,
        sourceType: "module",
    },

    rules: {
        "class-methods-use-this": 0,
        "comma-dangle": ["error", "never"],
        "linebreak-style": 0,
        "global-require": 0,
        "eslint linebreak-style": [0, "error", "windows"],
        "no-new": 0,
        "no-restricted-globals": 0,
        "no-restricted-syntax": 0,
        "no-console": 0,
        "no-underscore-dangle": 0,
        "import/extensions": 0,
    },
}];