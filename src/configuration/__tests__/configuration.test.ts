import * as E from "fp-ts/Either";
import { Configuration } from "../../types/configuration/configuration";
import {
  CONFIG_VAR_NAME,
  decodeConfiguration,
  readAndParseEnv,
} from "../service";

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
    expect(readAndParseEnv()).toEqual(E.right(jsonData));
  });

  it("should return Left with error if reading or parsing fails", () => {
    process.env[CONFIG_VAR_NAME] = "invalid-json";

    const result = readAndParseEnv();

    expect(result).toEqual(E.left(new Error("Error during JSON reading")));
  });
});

describe("decodeJSON", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should decode JSON successfully", () => {
    const jsonData = {
      key: "value",
    };
    const decodedData = {
      key: "value",
    };

    (Configuration.decode as jest.Mock).mockReturnValueOnce(
      E.right(decodedData),
    );

    const result = decodeConfiguration(jsonData);

    expect(result).toEqual(E.right(decodedData));
    expect(Configuration.decode).toHaveBeenCalledWith(jsonData);
  });

  it("should return Left with error if decoding fails", () => {
    const jsonData = {
      key: "value",
    };
    const decodingError = new Error("Error during JSON decoding");

    (Configuration.decode as jest.Mock).mockReturnValueOnce(
      E.left(decodingError),
    );

    const result = decodeConfiguration(jsonData);

    expect(result).toEqual(E.left(decodingError));
    expect(Configuration.decode).toHaveBeenCalledWith(jsonData);
  });
});
