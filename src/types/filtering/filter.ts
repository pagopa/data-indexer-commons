/* eslint-disable sort-keys */
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const DataFilter = t.partial({
  fieldName: NonEmptyString,
  condition: t.keyof({
    eq: null,
    neq: null,
    gt: null,
    gte: null,
    lt: null,
    lte: null,
  }),
  staticValue: t.union([
    NonEmptyString,
    t.number,
    t.boolean,
    t.null,
    t.undefined,
  ]),
});

export type DataFilter = t.TypeOf<typeof DataFilter>;
