import * as Joi from "joi";

import {
  EnvironmentApplicationSchema,
  EnvironmentSchema,
  EnvironmentSecurityCookieSchema,
  EnvironmentSecurityCorsSchema,
  EnvironmentSecuritySchema,
  EnvironmentSecurityThrottlersSchema,
  EnvironmentSecurityThrottlersValueSchema,
  EnvironmentServerSchema
} from "./models";

export const environmentValidation: Joi.ObjectSchema<EnvironmentSchema> = Joi.object<EnvironmentSchema>({
  profile: Joi.string().valid("development", "staging", "production").required(),
  application: Joi.object<EnvironmentApplicationSchema>({
    version: Joi.string().required(),
    name: Joi.string().required()
  }).required(),
  server: Joi.object<EnvironmentServerSchema>({
    port: Joi.number().port().required(),
    hostname: Joi.string().hostname().required()
  }).required(),
  security: Joi.object<EnvironmentSecuritySchema>({
    cors: Joi.object<EnvironmentSecurityCorsSchema>({
      origins: Joi.array<string[]>().items(Joi.string().ip(), Joi.string().uri(), Joi.string().valid("*")).required(),
      allowedHeaders: Joi.array<string[]>().items(Joi.string()).required(),
      exposedHeaders: Joi.array<string[]>().items(Joi.string()).required(),
      maxAge: Joi.number().integer().min(1).required()
    }).required(),
    cookie: Joi.object<EnvironmentSecurityCookieSchema>({
      secret: Joi.string().length(32).required()
    }).required(),
    throttlers: Joi.object<EnvironmentSecurityThrottlersSchema>({
      default: Joi.object<EnvironmentSecurityThrottlersValueSchema>({
        ttl: Joi.number().integer().min(1).required(),
        limit: Joi.number().integer().min(1).required()
      }).required()
    }).required()
  }).required()
}).required();
