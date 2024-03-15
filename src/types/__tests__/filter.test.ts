import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { DataFilter } from "../filtering/filter";

describe("Filter", () => {
  it.each`
    description                             | input                                                                                                          | success
    ${"valid filter"}                       | ${{ type: "staticFilter", fieldName: "age", condition: "gte", staticValue: 18 }}                               | ${true}
    ${"missing properties"}                 | ${{ type: "staticFilter", fieldName: "age" }}                                                                  | ${false}
    ${"invalid params"}                     | ${{ type: "staticFilter", fieldName: "age", condition: "gte", staticValue: "some" }}                           | ${false}
    ${"valid isNull filter"}                | ${{ type: "staticFilter", fieldName: "age", condition: "isNull" }}                                             | ${true}
    ${"invalid isNull filter"}              | ${{ type: "staticFilter", fieldName: "age", condition: "isNull", staticValue: 8 }}                             | ${false}
    ${"invalid condition"}                  | ${{ type: "staticFilter", fieldName: "age", condition: "invalid", staticValue: 18 }}                           | ${false}
    ${"filter with string staticValue"}     | ${{ type: "staticFilter", fieldName: "name", condition: "eq", staticValue: "John Doe" }}                       | ${true}
    ${"filter with number staticValue"}     | ${{ type: "staticFilter", fieldName: "age", condition: "gte", staticValue: 18 }}                               | ${true}
    ${"filter with boolean staticValue"}    | ${{ type: "staticFilter", fieldName: "is_active", condition: "eq", staticValue: true }}                        | ${true}
    ${"valid filter with compareFieldName"} | ${{ type: "dynamicFilter", fieldName: "is_active", condition: "eq", compareField: "some" }}                    | ${true}
    ${"filter with boolean staticValue"}    | ${{ type: "dynamicFilter", fieldName: "is_active", condition: "isNull", compareField: "some" }}                | ${false}
    ${"filter with boolean staticValue"}    | ${{ type: "dynamicFilter", fieldName: "is_active", condition: "eq", staticValue: true, compareField: "some" }} | ${false}
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
