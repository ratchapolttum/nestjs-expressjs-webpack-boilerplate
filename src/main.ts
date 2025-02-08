import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app/app.module";

class Application {
  private static readonly _logger: Logger = new Logger("Bootstrap");

  public static async run(): Promise<void> {
    try {
      const application: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter());

      await application.init();
      await application.listen(8080, "0.0.0.0");

      this._logger.log("Application started successfully");
    } catch (error) {
      if (error instanceof Error) {
        this._logger.error(error.message, error.stack);
      }

      this._logger.error("Application failed to start");
    }
  }
}

void Application.run();
