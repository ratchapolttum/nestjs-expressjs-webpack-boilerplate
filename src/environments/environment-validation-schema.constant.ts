import * as Joi from "joi";

import { EnvironmentServerValidationSchema, EnvironmentValidationSchema } from "./models";

export const environmentValidationSchema: Joi.ObjectSchema<EnvironmentValidationSchema> =
  Joi.object<EnvironmentValidationSchema>({
    profile: Joi.string().valid("development", "staging", "production").required(),
    server: Joi.object<EnvironmentServerValidationSchema>({
      port: Joi.number().port().required(),
      hostname: Joi.string().hostname().required()
    }).required()
  }).required();
