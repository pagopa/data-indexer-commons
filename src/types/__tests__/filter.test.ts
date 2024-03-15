import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { DataFilter } from "../filtering/filter";

describe("Filter", () => {
  it.each`
    description                             | input                                                                                                          | success
    ${"valid filter"}                       | ${{ filterType: "STATIC", fieldName: "age", condition: "gte", staticValue: 18 }}                               | ${true}
    ${"missing properties"}                 | ${{ filterType: "STATIC", fieldName: "age" }}                                                                  | ${false}
    ${"invalid params"}                     | ${{ filterType: "STATIC", fieldName: "age", condition: "gte", staticValue: "some" }}                           | ${false}
    ${"valid isNull filter"}                | ${{ filterType: "STATIC", fieldName: "age", condition: "isNull" }}                                             | ${true}
    ${"invalid isNull filter"}              | ${{ filterType: "STATIC", fieldName: "age", condition: "isNull", staticValue: 8 }}                             | ${false}
    ${"invalid condition"}                  | ${{ filterType: "STATIC", fieldName: "age", condition: "invalid", staticValue: 18 }}                           | ${false}
    ${"filter with string staticValue"}     | ${{ filterType: "STATIC", fieldName: "name", condition: "eq", staticValue: "John Doe" }}                       | ${true}
    ${"filter with number staticValue"}     | ${{ filterType: "STATIC", fieldName: "age", condition: "gte", staticValue: 18 }}                               | ${true}
    ${"filter with boolean staticValue"}    | ${{ filterType: "STATIC", fieldName: "is_active", condition: "eq", staticValue: true }}                        | ${true}
    ${"valid filter with compareFieldName"} | ${{ filterType: "DYNAMIC", fieldName: "is_active", condition: "eq", compareField: "some" }}                    | ${true}
    ${"filter with boolean staticValue"}    | ${{ filterType: "DYNAMIC", fieldName: "is_active", condition: "isNull", compareField: "some" }}                | ${false}
    ${"filter with boolean staticValue"}    | ${{ filterType: "DYNAMIC", fieldName: "is_active", condition: "eq", staticValue: true, compareField: "some" }} | ${false}
  `("should decode $description", ({ input, success }) => {
    pipe(
      input,
      DataFilter.decode,
      E.fold(
        () => {
          expect(success).toBeFalsy();
        },
        (res) => {
          expect(success).toBeTruthy();
          expect(res).toEqual(input);
        },
      ),
    );
  });
});
