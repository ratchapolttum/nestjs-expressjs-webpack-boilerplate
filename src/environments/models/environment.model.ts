import * as Joi from "joi";

import { EnvironmentApplication, EnvironmentApplicationSchema } from "./environment-application.model";
import { EnvironmentServer, EnvironmentServerSchema } from "./environment-server.model";

import { OnlyData, OnlySchema } from "../types";

class EnvironmentModel {
  public readonly profile?: string | Joi.StringSchema;
  public readonly application?: EnvironmentApplication | Joi.ObjectSchema<EnvironmentApplicationSchema>;
  public readonly server?: EnvironmentServer | Joi.ObjectSchema<EnvironmentServerSchema>;
}

export type Environment = OnlyData<EnvironmentModel>;
export type EnvironmentSchema = OnlySchema<EnvironmentModel>;
