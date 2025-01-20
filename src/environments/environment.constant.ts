import dotenv from "@dotenvx/dotenvx";

import path from "node:path";

import { Environment } from "./models";

const output: dotenv.DotenvConfigOutput = dotenv.config({
  path: path.resolve(__dirname, "environments", ".env." + process.env.NODE_ENV),
  encoding: "utf8"
});

export const environment: Environment = {
  profile: output.parsed?.NESTJS_PROFILE,
  server: {
    port: Number.parseInt(output.parsed?.SERVER_PORT, 10),
    hostname: output.parsed?.SERVER_HOSTNAME
  }
};
