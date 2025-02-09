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
  },
  security: {
    cors: {
      origins: process.env.CORS_ORIGINS?.split(",").map((origin: string): string => origin.trim()) ?? [],
      allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(",").map((header: string): string => header.trim()) ?? [],
      exposedHeaders: process.env.CORS_EXPOSED_HEADERS?.split(",").map((header: string): string => header.trim()) ?? [],
      maxAge: Number.parseInt(process.env.CORS_MAX_AGE ?? "0")
    }
  }
};
