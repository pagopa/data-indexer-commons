import * as t from "io-ts";
import {
  CDCDataSource,
  SelectAllMongoDataSource,
  SelectAllPostgresDataSource,
} from "../types/datasource";

export const MasterStreamDataSource = t.type({
  master: CDCDataSource,
});
export type MasterStreamDataSource = t.TypeOf<typeof MasterStreamDataSource>;

export const QueryStreamDataSource = t.partial({
  query: t.union([SelectAllMongoDataSource, SelectAllPostgresDataSource]),
});
export type QueryStreamDataSource = t.TypeOf<typeof QueryStreamDataSource>;

export const StreamDataSource = t.intersection([
  MasterStreamDataSource,
  QueryStreamDataSource,
]);
export type StreamDataSource = t.TypeOf<typeof StreamDataSource>;
