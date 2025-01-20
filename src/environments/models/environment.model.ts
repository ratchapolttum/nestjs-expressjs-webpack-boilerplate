import { OnlyData, OnlySchema } from "@type";

import * as Joi from "joi";

import { EnvironmentServer, EnvironmentServerValidationSchema } from "./environment-server.model";

class EnvironmentModel {
  readonly profile: string | Joi.StringSchema;
  readonly server: EnvironmentServer | Joi.ObjectSchema<EnvironmentServerValidationSchema>;
}

export type Environment = OnlyData<EnvironmentModel>;
export type EnvironmentValidationSchema = OnlySchema<EnvironmentModel>;
