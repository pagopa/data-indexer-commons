import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";
import { SelectFieldsMapping } from "./selectFields";

export const SelectInputConfig = t.type({
  fields: t.readonlyArray(NonEmptyString),
  type: t.literal("SELECT_INPUT"),
});

export const SelectInputSelectFieldsMapping = t.intersection([
  SelectInputConfig,
  SelectFieldsMapping,
]);
export type SelectInputSelectFieldsMapping = t.TypeOf<
  typeof SelectInputSelectFieldsMapping
>;

export const SelectInputMapping = SelectInputSelectFieldsMapping;

export type SelectInputMapping = t.TypeOf<typeof SelectInputMapping>;
