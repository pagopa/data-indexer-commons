import * as E from "fp-ts/Either";
import { ExcludeInputMapping } from "../excludeInput";

describe("ExcludeInputMapping", () => {
  it("should decode if config is a valid ExcludeInputMapping", () => {
    const validData = {
      mapper: "EXCLUDE_FIELDS",
      type: "EXCLUDE_INPUT",
      fields: ["foo", "bar"]
    };
    const result = ExcludeInputMapping.decode(validData);
    expect(E.isRight(result)).toBeTruthy();
  });
  it("should not validate if mapper is not 'EXCLUDE_FIELDS'", () => {
    const invalidData = {
      mapper: "INVALID_MAPPER",
      fields: ["foo", "bar"],
      type: "EXCLUDE_INPUT"
    };
    const result = ExcludeInputMapping.decode(invalidData);
    expect(E.isRight(result)).toBeFalsy();
  });
  it("should not validate if type is not 'EXCLUDE_INPUT'", () => {
    const invalidData = {
      mapper: "EXCLUDE_FIELDS",
      fields: ["foo", "bar"],
      type: "INVALID_TYPE"
    };
    const result = ExcludeInputMapping.decode(invalidData);
    expect(E.isRight(result)).toBeFalsy();
  });
  it("should not validate if fields are empty strings", () => {
    const invalidData = {
      mapper: "EXCLUDE_FIELDS",
      fields: ["", ""],
      type: "EXCLUDE_INPUT"
    };
    const result = ExcludeInputMapping.decode(invalidData);
    expect(E.isRight(result)).toBeFalsy();
  });
  it("should not validate if fields are not strings", () => {
    const invalidData = {
      mapper: "EXCLUDE_FIELDS",
      fields: [1, 2],
      type: "EXCLUDE_INPUT"
    };
    const result = ExcludeInputMapping.decode(invalidData);
    expect(E.isRight(result)).toBeFalsy();
  });
});
