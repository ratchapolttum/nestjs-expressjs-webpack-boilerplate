import eslintPluginJavaScript from "@eslint/js";
import eslintPluginMarkdown from "@eslint/markdown";

import eslintPluginJsonc from "eslint-plugin-jsonc";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginSonarJs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import eslintPluginYml from "eslint-plugin-yml";
import globals from "globals";
import jsoncESlintParser from "jsonc-eslint-parser";
import typescriptEslint from "typescript-eslint";
import yamlESlintParser from "yaml-eslint-parser";

/**
 * @type {string[]}
 */
const patternJsFiles = ["**/*.cjs", "**/*.js", "**/*.mjs"];

/**
 * @type {string[]}
 */
const patternTsFiles = ["**/*.ts"];

/**
 * @type {string[]}
 */
const patternFiles = [...patternJsFiles, ...patternTsFiles];

const typeScriptRulesConfigurations = [...typescriptEslint.configs.recommended].map((config) => {
  return {
    ...config,
    files: patternTsFiles,
    languageOptions: {
      ...config.languageOptions,
      parser: typescriptEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      ecmaVersion: 2022,
      sourceType: "module"
    },
    rules: {
      ...config.rules,
      "@typescript-eslint/no-unused-vars": "off"
    }
  };
});

/**
 * @type {import("eslint").Linter.Config[]}
 */
const configuration = [
  {
    ignores: ["**/coverage/*", "**/dist/*", "**/node_modules/*", "**/package-lock.json"]
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2022,
        ...globals.node
      }
    }
  },
  {
    ...eslintPluginPrettier,
    files: patternFiles
  },
  {
    files: patternFiles,
    plugins: {
      sonarjs: eslintPluginSonarJs
    },
    rules: {
      ...eslintPluginSonarJs.configs.recommended.rules
    }
  },
  {
    files: patternFiles,
    plugins: {
      unicorn: eslintPluginUnicorn
    },
    languageOptions: {
      globals: {
        ...globals.builtin
      }
    },
    rules: {
      ...eslintPluginUnicorn.configs["flat/recommended"].rules,
      "unicorn/no-null": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prevent-abbreviations": "off"
    }
  },
  {
    files: patternFiles,
    plugins: {
      promise: eslintPluginPromise
    },
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
    files: patternFiles,
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
  {
    files: patternFiles,
    languageOptions: {
      ecmaVersion: 2022
    },
    rules: {
      ...eslintPluginJavaScript.configs.recommended.rules,
      "array-callback-return": "error",
      "constructor-super": "off",
      "no-await-in-loop": "error",
      "no-cond-assign": "off",
      "no-const-assign": "off",
      "no-constructor-return": "error",
      "no-control-regex": "off",
      "no-dupe-else-if": "off",
      "no-duplicate-case": "off",
      "no-duplicate-imports": "error",
      "no-empty-character-class": "off",
      "no-invalid-regexp": "off",
      "no-misleading-character-class": "off",
      "no-new-native-nonconstructor": "off",
      "no-promise-executor-return": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-this-before-super": "off",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "no-unused-vars": "off",
      "use-isnan": "off"
    }
  },
  ...typeScriptRulesConfigurations,
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
  ...eslintPluginYml.configs["flat/recommended"].map((config) => {
    return {
      ...config,
      files: ["**/*.yml", "**/*.yaml"],
      languageOptions: {
        parser: yamlESlintParser,
        parserOptions: {
          defaultYAMLVersion: "1.2"
        }
      },
      rules: {
        ...config.rules,
        "yml/block-mapping": "error",
        "yml/block-mapping-question-indicator-newline": "error",
        "yml/block-sequence-hyphen-indicator-newline": "error",
        "yml/block-sequence": "error",
        "yml/file-extension": [
          "error",
          {
            extension: "yml"
          }
        ],
        "yml/flow-mapping-curly-newline": "error",
        "yml/flow-mapping-curly-spacing": "error",
        "yml/flow-sequence-bracket-newline": "error",
        "yml/flow-sequence-bracket-spacing": "error",
        "yml/indent": "error",
        "yml/key-spacing": "error",
        "yml/no-multiple-empty-lines": "error",
        "yml/no-trailing-zeros": "error",
        "yml/plain-scalar": "error",
        "yml/quotes": "error",
        "yml/spaced-comment": "error"
      }
    };
  }),
  {
    files: ["**/*.md"],
    plugins: {
      markdown: eslintPluginMarkdown
    },
    processor: "markdown/markdown"
  },
  {
    files: ["**/*.md/*.cjs", "**/*.md/*.js", "**/*.md/*.mjs"],
    rules: {
      "unicorn/filename-case": "off"
    }
  }
];
export default configuration;
