import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import express from "express";

import { AppModule } from "./app/app.module";

class Application {
  private static readonly logger: Logger = new Logger("Bootstrap");

  public static async run(): Promise<void> {
    try {
      const application: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter(express()));

      await application.init();
      await application.listen(8080, "0.0.0.0");

      this.logger.log(`Running in ${environment.profile} mode`);
      this.logger.log(`Listening on ${await application.getUrl()}`);
      this.logger.log("Application started successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      }

      this.logger.error("Application failed to start");
    }
  }
}

Application.run();
