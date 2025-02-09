import { environment, EnvironmentSchema, environmentValidation } from "@environment";

import { Module, OnModuleInit } from "@nestjs/common";

import { ValidationResult } from "joi";

import { CorsPolicyService } from "./services";

@Module({
  providers: [CorsPolicyService],
  exports: [CorsPolicyService]
})
export class CoreModule implements OnModuleInit {
  private validEnvironment(): void {
    const { error }: ValidationResult<EnvironmentSchema> = environmentValidation.validate(environment);

    if (error) {
      throw new Error(`Failed to validate the environment variable due to ${error.message}`);
    }
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
