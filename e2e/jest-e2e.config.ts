import path from "node:path";

import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "../tsconfig.json";

const configuration: JestConfigWithTsJest = {
  rootDir: ".",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: String.raw`\.e2e-spec\.ts$`,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: path.resolve()
  })
};

export default configuration;
