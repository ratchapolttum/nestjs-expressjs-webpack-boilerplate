import { Injectable, NestMiddleware } from "@nestjs/common";

import helmet from "helmet";

import { NextFunction, Request, Response } from "express";

@Injectable()
export class HelmetMiddleware implements NestMiddleware<Request, Response> {
  public use(request: Request, response: Response, next: NextFunction): void {
    helmet()(request, response, next);
  }
}
