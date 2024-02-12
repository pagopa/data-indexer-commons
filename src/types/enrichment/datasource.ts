import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

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

export const BlobStorage = t.type({
  params: BlobStorageParams,
  type: t.literal("BlobStorage"),
});

export const TableStorage = t.type({
  params: TableStorageParams,
  type: t.literal("TableStorage"),
});

export const API = t.type({
  params: APIParams,
  type: t.literal("API"),
});

const CommonDBParams = t.type({
  connectionString: NonEmptyString,
  id: NonEmptyString,
  query: NonEmptyString,
});

const CosmosDBParams = t.intersection([
  CommonDBParams,
  t.type({
    partitionKey: NonEmptyString,
  }),
]);

const MongoDBParams = CommonDBParams;

const PosgresDBParams = CommonDBParams;

const DBParams = t.union([CosmosDBParams, MongoDBParams, PosgresDBParams]);

export const DB = t.type({
  params: DBParams,
  type: t.literal("DB"),
});

export const EnrichmentDataSource = t.union([
  BlobStorage,
  TableStorage,
  API,
  DB,
]);

export type EnrichmentDataSource = t.TypeOf<typeof EnrichmentDataSource>;
