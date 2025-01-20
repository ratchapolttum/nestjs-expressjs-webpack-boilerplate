import { environment, EnvironmentValidationSchema, environmentValidationSchema } from "@environment";

import { Module, OnModuleInit } from "@nestjs/common";

import * as Joi from "joi";

@Module({})
export class CoreModule implements OnModuleInit {
  private validEnvironment(): void {
    const { error }: Joi.ValidationResult<EnvironmentValidationSchema> =
      environmentValidationSchema.validate(environment);

    if (error) {
      throw new Error(`Failed to validate environment because of ${error.message}`);
    }
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
