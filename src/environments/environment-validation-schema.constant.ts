import * as Joi from "joi";

import { EnvironmentValidationSchema } from "./models";

export const environmentValidationSchema: Joi.ObjectSchema<EnvironmentValidationSchema> =
  Joi.object<EnvironmentValidationSchema>({
    profile: Joi.string().valid("development", "staging", "production").required()
  }).required();
