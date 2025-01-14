import { TestBed, UnitTestBed } from "@suites/unit";

import { ExampleService } from "./example.service";

describe("ExampleService", (): void => {
  let service: ExampleService;

  beforeAll(async (): Promise<void> => {
    const { unit }: UnitTestBed<ExampleService> = await TestBed.solitary(ExampleService).compile();

    service = unit;
  });

  it("Should be defined", (): void => {
    expect(service).toBeDefined();
  });

  describe("Success cases", (): void => {
    it("Should return 'Hello World'", (): void => {
      const actual: string = service.hello();
      const expected: string = "Hello World";

      expect(actual).toEqual(expected);
    });
  });
});
