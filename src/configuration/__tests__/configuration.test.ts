import * as E from "fp-ts/Either";
import * as fs from "fs";
import { DataPipeline } from "../../types/configuration/configuration";
import { decodeJSON, readJSON } from "../configuration";

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
}));

jest.mock("../../types/configuration/configuration", () => ({
  DataPipeline: {
    decode: jest.fn(),
  },
}));

describe("readJSON", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should read and parse JSON file successfully", () => {
    const jsonFilePath = "/path/to/json/file.json";
    const jsonData = { key: "value" };
    const jsonFileContent = JSON.stringify(jsonData);

    (fs.readFileSync as jest.Mock).mockReturnValueOnce(jsonFileContent);

    const result = readJSON(jsonFilePath);

    expect(result).toEqual(E.right(jsonData));
    expect(fs.readFileSync).toHaveBeenCalledWith(jsonFilePath);
  });

  it("should return Left with error if reading or parsing fails", () => {
    const jsonFilePath = "/path/to/json/file.json";
    const error = new Error("Error during JSON reading");

    (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    const result = readJSON(jsonFilePath);

    expect(result).toEqual(E.left(error));
    expect(fs.readFileSync).toHaveBeenCalledWith(jsonFilePath);
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

    (DataPipeline.decode as jest.Mock).mockReturnValueOnce(
      E.right(decodedData),
    );

    const result = decodeJSON(jsonData);

    expect(result).toEqual(E.right(decodedData));
    expect(DataPipeline.decode).toHaveBeenCalledWith(jsonData);
  });

  it("should return Left with error if decoding fails", () => {
    const jsonData = {
      key: "value",
    };
    const decodingError = new Error("Error during JSON decoding");

    (DataPipeline.decode as jest.Mock).mockReturnValueOnce(
      E.left(decodingError),
    );

    const result = decodeJSON(jsonData);

    expect(result).toEqual(E.left(decodingError));
    expect(DataPipeline.decode).toHaveBeenCalledWith(jsonData);
  });
});
