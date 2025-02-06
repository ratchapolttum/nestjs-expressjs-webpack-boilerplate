import path from "node:path";

import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const configuration: JestConfigWithTsJest = {
  rootDir: "src",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: String.raw`.*\.spec\.ts$`,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: path.resolve()
  }),
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage"
};

export default configuration;
