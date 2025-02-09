import { Environment } from "./models";

export const environment: Environment = {
  profile: process.env.NESTJS_PROFILE ?? "",
  application: {
    version: process.env.APPLICATION_VERSION ?? "",
    name: process.env.APPLICATION_NAME ?? ""
  },
  server: {
    port: Number.parseInt(process.env.SERVER_PORT ?? "0"),
    hostname: process.env.SERVER_HOSTNAME ?? ""
  }
};
