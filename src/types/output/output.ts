import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

const DeduplicationStrategy = t.partial({
  deduplicationStrategy: t.literal("INDEXER"),
});

const DataOutputConfig = t.type({
  connectionString: NonEmptyString,
  indexName: NonEmptyString,
  indexer: t.literal("ELASTICSEARCH"),
  type: t.literal("DATA_OUTPUT"),
});

export const DataOutput = t.intersection([
  DataOutputConfig,
  DeduplicationStrategy,
]);

export type DataOutput = t.TypeOf<typeof DataOutput>;

const IndexerSinkDataSourceConfig = t.type({
  connectionString: NonEmptyString,
  indexer: t.literal("ELASTICSEARCH"),
  type: t.literal("DATA_OUTPUT"),
});

export const IndexerSinkDataSource = t.intersection([
  IndexerSinkDataSourceConfig,
  DeduplicationStrategy,
]);

export type IndexerSinkDataSource = t.TypeOf<typeof IndexerSinkDataSource>;
