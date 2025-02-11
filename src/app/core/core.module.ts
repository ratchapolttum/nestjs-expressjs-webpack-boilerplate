import { environment, EnvironmentSchema, environmentValidation } from "@environment";

import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod
} from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { ValidationResult } from "joi";

import { CookieMiddleware, HelmetMiddleware, ResponseTimeMiddleware } from "./middlewares";
import { CorsPolicyService } from "./services";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: environment.security.throttlers.default.ttl,
          limit: environment.security.throttlers.default.limit
        }
      ]
    })
  ],
  providers: [
    CorsPolicyService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
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
