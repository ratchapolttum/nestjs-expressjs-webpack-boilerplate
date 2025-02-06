import { TestBed } from "@suites/unit";

import { ExampleService } from "./example.service";

describe("ExampleService", (): void => {
  let service: ExampleService;

  beforeAll(async (): Promise<void> => {
    const { unit } = await TestBed.solitary(ExampleService).compile();

    service = unit;
  });

  it("Should be defined", (): void => {
    expect(service).toBeDefined();
  });

  describe("Success cases", (): void => {
    it("Should return 'Hello World'", (): void => {
      expect(service.hello()).toEqual("Hello World");
    });
  });
});
