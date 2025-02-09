import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export class OpenApi {
  private readonly _logger: Logger = new Logger();

  private readonly _application: NestExpressApplication;
  private readonly _prefix: string;
  private readonly _pathUI: string;
  private readonly _pathJSON: string;
  private readonly _pathYAML: string;

  public constructor(application: NestExpressApplication) {
    this._application = application;
    this._prefix = "api-docs";
    this._pathUI = `${this._prefix}/ui`;
    this._pathJSON = `${this._prefix}/json`;
    this._pathYAML = `${this._prefix}/yaml`;
  }

  public run(): void {
    const builder: DocumentBuilder = new DocumentBuilder()
      .setVersion(environment.application.version)
      .setTitle(environment.application.name)
      .setDescription("APIs documentation");
    const document: OpenAPIObject = SwaggerModule.createDocument(this._application, builder.build(), {
      autoTagControllers: true,
      deepScanRoutes: true,
      ignoreGlobalPrefix: false
    });

    SwaggerModule.setup(this._pathUI, this._application, document, {
      jsonDocumentUrl: this._pathJSON,
      yamlDocumentUrl: this._pathYAML,
      explorer: true,
      raw: ["json"],
      swaggerOptions: {
        filter: true
      },
      customCss: `
        .parameters-col_name {
          width: 40%;
          padding: 10px 0 0;
          vertical-align: top;
        }

        .parameters-col_description {
          width: 60%;
          padding: 10px 0 0;
          vertical-align: top;
          margin-bottom: 2em;
        }
      `,
      useGlobalPrefix: false
    });

    this._logger.log(`OpenApiController {/${this._prefix}}:`, "RoutesResolver");
    this._logger.log(`Mapped {/${this._pathUI}, GET} route`, "RouterExplorer");
    this._logger.log(`Mapped {/${this._pathJSON}, GET} route`, "RouterExplorer");
    this._logger.log(`Mapped {/${this._pathYAML}, GET} route`, "RouterExplorer");
  }
}
