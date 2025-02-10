import { environment } from "@environment";

import { Injectable, NestMiddleware } from "@nestjs/common";

import cookieParser from "cookie-parser";

import { NextFunction, Request, Response } from "express";

@Injectable()
export class CookieMiddleware implements NestMiddleware<Request, Response> {
  public use(request: Request, response: Response, next: NextFunction): void {
    cookieParser(environment.security.cookie.secret)(request, response, next);
  }
}
