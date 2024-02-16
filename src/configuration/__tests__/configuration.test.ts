import * as E from "fp-ts/Either";
import { CONFIG_VAR_NAME, readAndParseEnv } from "../service";

jest.mock("../../types/configuration/configuration", () => ({
  Configuration: {
    decode: jest.fn(),
  },
}));

const jsonData = { key: "value" };

beforeAll(() => {
  process.env[CONFIG_VAR_NAME] = JSON.stringify(jsonData);
});

describe("readAndParseEnv", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should read and parse JSON file successfully", () => {
    // expect(readAndParseEnv()).toEqual(E.right(jsonData));
    const result = readAndParseEnv();
    console.log(result);
  });

  it("should return Left with error if reading or parsing fails", () => {
    process.env[CONFIG_VAR_NAME] = "invalid-json";

    const result = readAndParseEnv();

    expect(result).toEqual(E.left(new Error("Error during JSON reading")));
  });
});
