import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

class EnvironmentSecurityCorsModel {
  public readonly origins?: string[] | Joi.ArraySchema<string[]>;
  public readonly allowedHeaders?: string[] | Joi.ArraySchema<string[]>;
  public readonly exposedHeaders?: string[] | Joi.ArraySchema<string[]>;
  public readonly maxAge?: number | Joi.NumberSchema;
}

export type EnvironmentSecurityCors = OnlyData<EnvironmentSecurityCorsModel>;
export type EnvironmentSecurityCorsSchema = OnlySchema<EnvironmentSecurityCorsModel>;

class EnvironmentSecurityModel {
  public readonly cors?: EnvironmentSecurityCors | Joi.ObjectSchema<EnvironmentSecurityCorsSchema>;
}

export type EnvironmentSecurity = OnlyData<EnvironmentSecurityModel>;
export type EnvironmentSecuritySchema = OnlySchema<EnvironmentSecurityModel>;
