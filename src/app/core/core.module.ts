import { environment, EnvironmentSchema, environmentValidation } from "@environment";

import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from "@nestjs/common";

import { ValidationResult } from "joi";

import { CookieMiddleware, HelmetMiddleware, ResponseTimeMiddleware } from "./middlewares";
import { CorsPolicyService } from "./services";

@Module({
  providers: [CorsPolicyService],
  exports: [CorsPolicyService]
})
export class CoreModule implements NestModule, OnModuleInit {
  private validEnvironment(): void {
    const { error }: ValidationResult<EnvironmentSchema> = environmentValidation.validate(environment);

    if (error) {
      throw new Error(`Failed to validate the environment variable due to ${error.message}`);
    }
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CookieMiddleware, HelmetMiddleware, ResponseTimeMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
