import { OnlyData, OnlySchema } from "@type";

import * as Joi from "joi";

class EnvironmentServerModel {
  readonly port: number | Joi.NumberSchema;
  readonly hostname: string | Joi.StringSchema;
}

export type EnvironmentServer = OnlyData<EnvironmentServerModel>;
export type EnvironmentServerValidationSchema = OnlySchema<EnvironmentServerModel>;
