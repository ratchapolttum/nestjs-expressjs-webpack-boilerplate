import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

class EnvironmentApplicationModel {
  public readonly version?: string | Joi.StringSchema;
  public readonly name?: string | Joi.StringSchema;
}

export type EnvironmentApplication = OnlyData<EnvironmentApplicationModel>;
export type EnvironmentApplicationSchema = OnlySchema<EnvironmentApplicationModel>;
