import { CorsPolicyService } from "@core";
import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { useContainer } from "class-validator";

import { OpenApi } from "./open-api";

import { AppModule } from "./app/app.module";

class Application {
  private static readonly _logger: Logger = new Logger("Bootstrap");

  public static async run(): Promise<void> {
    try {
      const application: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter());

      useContainer(application.select(AppModule), { fallbackOnErrors: true });

      application.enableCors(application.get(CorsPolicyService).configuration());

      if (["development", "staging"].includes(environment.profile)) {
        new OpenApi(application).run();
      }

      await application.init();
      await application.listen(environment.server.port, environment.server.hostname);

      this._logger.log(`Running in ${environment.profile} mode`);
      this._logger.log(`Listening on ${await application.getUrl()}`);
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
