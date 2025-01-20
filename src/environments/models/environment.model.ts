import { OnlyData, OnlySchema } from "@type";

import * as Joi from "joi";

class EnvironmentModel {
  readonly profile: string | Joi.StringSchema;
}

export type Environment = OnlyData<EnvironmentModel>;
export type EnvironmentValidationSchema = OnlySchema<EnvironmentModel>;
