import * as Joi from "joi";

import { EnvironmentApplicationSchema, EnvironmentSchema, EnvironmentServerSchema } from "./models";

export const environmentValidation: Joi.ObjectSchema<EnvironmentSchema> = Joi.object<
  EnvironmentSchema,
  false,
  EnvironmentSchema
>({
  profile: Joi.string().valid("development", "staging", "production").required(),
  application: Joi.object<EnvironmentApplicationSchema, false, EnvironmentApplicationSchema>({
    version: Joi.string().required(),
    name: Joi.string().required()
  }).required(),
  server: Joi.object<EnvironmentServerSchema, false, EnvironmentServerSchema>({
    port: Joi.number().port().required(),
    hostname: Joi.string().hostname().required()
  }).required()
}).required();
