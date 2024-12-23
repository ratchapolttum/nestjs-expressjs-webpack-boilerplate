import globals from "globals";
import jsonc from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";

/**
 * Configuration for ESLint
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    ignores: ["**/node_modules/*"]
  },
  ...jsonc.configs["flat/recommended-with-jsonc"].map((config) => {
    return {
      ...config,
      files: ["**/*.json", "**/*.json5", "**/*.jsonc", "**/*.jsonl"],
      languageOptions: {
        parser: jsoncParser,
        parserOptions: {
          jsonSyntax: "JSONC"
        }
      },
      rules: {
        ...config.rules,
        "jsonc/array-bracket-newline": "error",
        "jsonc/array-bracket-spacing": "error",
        "jsonc/array-element-newline": "error",
        "jsonc/comma-dangle": "error",
        "jsonc/comma-style": "error",
        "jsonc/indent": ["error", 2],
        "jsonc/key-spacing": "error",
        "jsonc/no-comments": "error",
        "jsonc/no-irregular-whitespace": "error",
        "jsonc/no-octal-escape": "error",
        "jsonc/object-curly-newline": "error",
        "jsonc/object-curly-spacing": "error",
        "jsonc/object-property-newline": "error"
      }
    };
  }),
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
