import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { DataFilter } from "../filtering/filter";

describe("Filter", () => {
  it.each`
    description                          | input                                                              | success
    ${"valid filter"}                    | ${{ fieldName: "age", condition: "gte", staticValue: 18 }}         | ${true}
    ${"missing properties"}              | ${{ fieldName: "age" }}                                            | ${false}
    ${"invalid condition"}               | ${{ fieldName: "age", condition: "invalid", staticValue: 18 }}     | ${false}
    ${"filter with string staticValue"}  | ${{ fieldName: "name", condition: "eq", staticValue: "John Doe" }} | ${true}
    ${"filter with number staticValue"}  | ${{ fieldName: "age", condition: "gte", staticValue: 18 }}         | ${true}
    ${"filter with boolean staticValue"} | ${{ fieldName: "is_active", condition: "eq", staticValue: true }}  | ${true}
  `("should decode $description", ({ input, success }) => {
    pipe(
      input,
      DataFilter.decode,
      E.mapLeft(() => expect(success).toBeFalsy()),
      E.map((decoded) => expect(decoded).toEqual(input)),
    );
  });
});
