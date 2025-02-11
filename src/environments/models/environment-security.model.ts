import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

class EnvironmentSecurityCorsModel {
  public readonly origins: string[] | Joi.ArraySchema<string[]>;
  public readonly allowedHeaders: string[] | Joi.ArraySchema<string[]>;
  public readonly exposedHeaders: string[] | Joi.ArraySchema<string[]>;
  public readonly maxAge: number | Joi.NumberSchema;
}

export type EnvironmentSecurityCors = OnlyData<EnvironmentSecurityCorsModel>;
export type EnvironmentSecurityCorsSchema = OnlySchema<EnvironmentSecurityCorsModel>;

class EnvironmentSecurityCookieModel {
  public readonly secret: string | Joi.StringSchema;
}

export type EnvironmentSecurityCookie = OnlyData<EnvironmentSecurityCookieModel>;
export type EnvironmentSecurityCookieSchema = OnlySchema<EnvironmentSecurityCookieModel>;

class EnvironmentSecurityThrottlersValueModel {
  public readonly ttl: number | Joi.NumberSchema;
  public readonly limit: number | Joi.NumberSchema;
}

export type EnvironmentSecurityThrottlersValue = OnlyData<EnvironmentSecurityThrottlersValueModel>;
export type EnvironmentSecurityThrottlersValueSchema = OnlySchema<EnvironmentSecurityThrottlersValueModel>;

class EnvironmentSecurityThrottlersModel {
  public readonly default:
    | EnvironmentSecurityThrottlersValue
    | Joi.ObjectSchema<EnvironmentSecurityThrottlersValueSchema>;
}

export type EnvironmentSecurityThrottlers = OnlyData<EnvironmentSecurityThrottlersModel>;
export type EnvironmentSecurityThrottlersSchema = OnlySchema<EnvironmentSecurityThrottlersModel>;

class EnvironmentSecurityModel {
  public readonly cors: EnvironmentSecurityCors | Joi.ObjectSchema<EnvironmentSecurityCorsSchema>;
  public readonly cookie: EnvironmentSecurityCookie | Joi.ObjectSchema<EnvironmentSecurityCookieSchema>;
  public readonly throttlers: EnvironmentSecurityThrottlers | Joi.ObjectSchema<EnvironmentSecurityThrottlersSchema>;
}

export type EnvironmentSecurity = OnlyData<EnvironmentSecurityModel>;
export type EnvironmentSecuritySchema = OnlySchema<EnvironmentSecurityModel>;
