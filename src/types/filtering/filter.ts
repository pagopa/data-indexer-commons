/* eslint-disable sort-keys */
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

const DataFilterCommon = t.type({
  fieldName: NonEmptyString,
});

const DataFilterStaticConditions = t.union([
  t.type({
    condition: t.union([t.literal("eq"), t.literal("neq")]),
    staticValue: t.union([NonEmptyString, t.number, t.boolean]),
  }),
  t.type({
    condition: t.union([
      t.literal("gt"),
      t.literal("gte"),
      t.literal("lt"),
      t.literal("lte"),
    ]),
    staticValue: t.number,
  }),
  t.type({
    condition: t.union([
      t.literal("isNull"),
      t.literal("isNotNull"),
      t.literal("isUndefined"),
      t.literal("isNotUndefined"),
    ]),
  }),
]);

const DataFilterStatic = t.intersection([
  DataFilterCommon,
  DataFilterStaticConditions,
]);

const DataFilterField = t.intersection([
  DataFilterCommon,
  t.type({
    condition: t.union([
      t.literal("eq"),
      t.literal("neq"),
      t.literal("lt"),
      t.literal("lte"),
      t.literal("gt"),
      t.literal("gte"),
    ]),
    compareField: NonEmptyString,
  }),
]);

export const DataFilter = t.union([DataFilterStatic, DataFilterField]);

export type DataFilter = t.TypeOf<typeof DataFilter>;
