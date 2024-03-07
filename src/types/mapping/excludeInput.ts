import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const ExcludeInputConfig = t.type({
  fields: t.readonlyArray(NonEmptyString),
  type: t.literal("EXCLUDE_INPUT"),
});

export const ExcludeFieldsMapping = t.type({
  mapper: t.literal("EXCLUDE_FIELDS"),
});

export type ExcludeFieldsMapping = t.TypeOf<typeof ExcludeFieldsMapping>;

export const ExcludeInputExcludeFieldsMapping = t.intersection([
  ExcludeInputConfig,
  ExcludeFieldsMapping,
]);

export type ExcludeInputExcludeFieldsMapping = t.TypeOf<
  typeof ExcludeInputExcludeFieldsMapping
>;

export const ExcludeInputMapping = ExcludeInputExcludeFieldsMapping;

export type ExcludeInputMapping = t.TypeOf<typeof ExcludeInputMapping>;
