/**
 * @type {import("lint-staged").Config}
 */
const config = {
  "**/*.{cjs,js,json,json5,jsonc,jsonl,md,mjs,ts,yaml,yml}": ["eslint --fix"]
};

export default config;
