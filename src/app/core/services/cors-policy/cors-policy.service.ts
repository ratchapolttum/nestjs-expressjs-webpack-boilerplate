import { environment } from "@environment";

import { HttpStatus, Injectable } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

@Injectable()
export class CorsPolicyService {
  private handlerOrigin(origin: string, callback: (error: Error | null, allowed: boolean) => void): void {
    if (environment.security.cors.origins.includes(origin) || environment.security.cors.origins.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} is not allowed to access this resource with CORS policy`), false);
    }
  }

  public configuration(): CorsOptions {
    return {
      origin: this.handlerOrigin.bind(this),
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: environment.security.cors.allowedHeaders,
      exposedHeaders: environment.security.cors.exposedHeaders,
      credentials: true,
      maxAge: environment.security.cors.maxAge,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
      preflightContinue: false
    };
  }
}
