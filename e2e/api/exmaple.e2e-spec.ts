import { ExampleModule } from "@api";

import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { Test, TestingModule } from "@nestjs/testing";

import supertest from "supertest";

describe("Example", (): void => {
  let application: NestExpressApplication;

  beforeAll(async (): Promise<void> => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [ExampleModule]
    }).compile();

    application = fixture.createNestApplication(new ExpressAdapter());

    await application.init();
  });

  afterAll(async (): Promise<void> => {
    await application.close();
  });

  describe("Success cases", (): void => {
    it("GET {/} > Ok (200) ~ Should return 'Hello World'", (): supertest.Test => {
      return supertest(application.getHttpServer())
        .get("/")
        .expect((response: supertest.Response): void => {
          expect(response.status).toBe(200);
          expect(response.text).toBe("Hello World");
        });
    });
  });
});
