import eslintPluginJsonc from "eslint-plugin-jsonc";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import jsoncESlintParser from "jsonc-eslint-parser";

const patternJsFiles = ["**/*.cjs", "**/*.js", "**/*.mjs"];

/**
 * Configuration for ESLint
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    ignores: ["**/node_modules/*"]
  },
  {
    ...eslintPluginPrettier,
    files: patternJsFiles
  },
  {
    ...eslintPluginPromise.configs["flat/recommended"],
    files: patternJsFiles,
    rules: {
      ...eslintPluginPromise.configs["flat/recommended"].rules,
      "promise/always-return": [
        "error",
        {
          ignoreLastCallback: true
        }
      ],
      "promise/no-callback-in-promise": "error",
      "promise/no-multiple-resolved": "error",
      "promise/no-nesting": "error",
      "promise/no-promise-in-callback": "error",
      "promise/no-return-in-finally": "error",
      "promise/spec-only": "error",
      "promise/valid-params": "error"
    }
  },
  {
    files: patternJsFiles,
    plugins: {
      "unused-imports": eslintPluginUnusedImports
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_"
        }
      ]
    }
  },
  ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"].map((config) => {
    return {
      ...config,
      files: ["**/*.json", "**/*.json5", "**/*.jsonc", "**/*.jsonl"],
      languageOptions: {
        parser: jsoncESlintParser,
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
        ...globals.es2021,
        ...globals.node
      }
    }
  }
];
