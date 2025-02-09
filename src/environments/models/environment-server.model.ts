import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

class EnvironmentServerModel {
  public readonly port?: number | Joi.StringSchema;
  public readonly hostname?: string | Joi.StringSchema;
}

export type EnvironmentServer = OnlyData<EnvironmentServerModel>;
export type EnvironmentServerSchema = OnlySchema<EnvironmentServerModel>;
