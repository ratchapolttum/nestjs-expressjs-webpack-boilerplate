import { Mocked, TestBed } from "@suites/unit";

import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";

describe("ExampleController", (): void => {
  let controller: ExampleController;
  let service: Mocked<ExampleService>;

  beforeAll(async (): Promise<void> => {
    const { unit, unitRef } = await TestBed.solitary(ExampleController).compile();

    controller = unit;
    service = unitRef.get(ExampleService);
  });

  it("Should be defined", (): void => {
    expect(controller).toBeDefined();
  });

  describe("Success cases", (): void => {
    it("Should return 'Hello World'", (): void => {
      const expected: string = "Hello World";

      service.hello.mockReturnValue(expected);

      expect(controller.index()).toEqual(expected);
    });
  });
});
