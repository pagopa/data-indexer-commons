/* eslint-disable sort-keys */
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

const APIParams = t.type({
  authentication: t.partial({
    authHeaderName: NonEmptyString,
    authHeaderValue: NonEmptyString,
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

const BlobStorageParams = t.intersection([
  t.type({
    blobFilename: NonEmptyString,
    connectionString: NonEmptyString,
    containerName: NonEmptyString,
  }),
  t.partial({
    extension: NonEmptyString,
  }),
]);

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
  dbResourceName: NonEmptyString,
});

export const CommonFindDbParams = t.intersection([
  t.type({
    dbResourceKeyFieldName: NonEmptyString,
    streamKeyFieldName: NonEmptyString,
  }),
  t.partial({
    selectFields: t.readonlyArray(NonEmptyString),
  }),
]);

export type CommonFindDbParams = t.TypeOf<typeof CommonFindDbParams>;

export const RelationalModelFindByKeyParams = t.intersection([
  CommonFindDbParams,
  t.type({
    queryType: t.literal("FIND_BY_KEY"),
  }),
]);
export type RelationalModelFindByKeyParams = t.TypeOf<
  typeof RelationalModelFindByKeyParams
>;

export const DocumentModelQueryParams = t.intersection([
  CommonFindDbParams,
  t.partial({
    dbResourcePkFieldName: NonEmptyString,
    streamPkFieldName: NonEmptyString,
  }),
]);

export type DocumentModelQueryParams = t.TypeOf<
  typeof DocumentModelQueryParams
>;

export const DocumentModelFindByKeyQueryParams = t.intersection([
  DocumentModelQueryParams,
  t.type({
    queryType: t.literal("FIND_BY_KEY"),
  }),
]);

export type DocumentModelFindByKeyQueryParams = t.TypeOf<
  typeof DocumentModelFindByKeyQueryParams
>;

export const DocumentModelVersionedQueryParams = t.intersection([
  DocumentModelQueryParams,
  t.type({
    queryType: t.literal("FIND_LAST_VERSION"),
    dbResourceVersionFieldName: NonEmptyString,
  }),
]);

export type DocumentModelVersionedQueryParams = t.TypeOf<
  typeof DocumentModelVersionedQueryParams
>;

export const RelationalModelVersionedQueryParams = t.intersection([
  CommonFindDbParams,
  t.type({
    queryType: t.literal("FIND_LAST_VERSION"),
    dbResourceVersionFieldName: NonEmptyString,
  }),
]);
export type RelationalModelVersionedQueryParams = t.TypeOf<
  typeof RelationalModelVersionedQueryParams
>;

export const DocumentDBParams = t.intersection([
  CommonDBParams,
  t.union([
    DocumentModelFindByKeyQueryParams,
    DocumentModelVersionedQueryParams,
  ]),
]);

export type DocumentDBParams = t.TypeOf<typeof DocumentDBParams>;

export const RelationalDBParams = t.intersection([
  CommonDBParams,
  t.union([
    RelationalModelFindByKeyParams,
    RelationalModelVersionedQueryParams,
  ]),
]);
export type RelationalDBParams = t.TypeOf<typeof RelationalDBParams>;

export const DBEnrichmentDataSource = t.union([
  t.type({ type: t.literal("CosmosDB"), params: DocumentDBParams }),
  t.type({ type: t.literal("MongoDB"), params: DocumentDBParams }),
  t.type({ type: t.literal("PosgresDB"), params: RelationalDBParams }),
]);
export type DBEnrichmentDataSource = t.TypeOf<typeof DBEnrichmentDataSource>;

export const EnrichmentDataSource = t.union([
  BlobStorage,
  TableStorage,
  API,
  DBEnrichmentDataSource,
]);

export type EnrichmentDataSource = t.TypeOf<typeof EnrichmentDataSource>;
