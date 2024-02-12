import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

const DBParams = t.type({
  connectionString: NonEmptyString,
  query: NonEmptyString,
  whereConditionId: NonEmptyString,
});

const APIParams = t.type({
  authentication: t.partial({
    apiKeyHeaderName: NonEmptyString,
    apiKeyHeaderValue: NonEmptyString,
  }),
  endpointUrl: NonEmptyString,
  idParam: NonEmptyString,
});

const TableStorageParams = t.type({
  connectionString: NonEmptyString,
  partitionKey: NonEmptyString,
  rowKey: NonEmptyString,
  tableName: NonEmptyString,
});

const BlobStorageParams = t.type({
  blobFilename: NonEmptyString,
  connectionString: NonEmptyString,
  containerName: NonEmptyString,
  extension: NonEmptyString,
});

export const DataEnrichment = t.partial({
  params: t.union([BlobStorageParams, TableStorageParams, APIParams, DBParams]),
  type: t.union([
    t.literal("BlobStorage"),
    t.literal("TableStorage"),
    t.literal("API"),
    t.literal("DB"),
  ]),
});

export type DataEnrichment = t.TypeOf<typeof DataEnrichment>;
