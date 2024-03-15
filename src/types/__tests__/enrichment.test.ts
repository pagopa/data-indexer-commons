import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { EnrichmentDataSource } from "../enrichment/enrichment";

describe("DataEnrichment", () => {
  const aBlobStorageParams = {
    blobFilename: "file.txt",
    connectionString: "blob_connection_string",
    containerName: "container",
    extension: "txt",
  };

  const aCosmosDBParams = {
    connectionString: "cosmos_db_connection_string",
    dbName: "dbName",
    dbResourceKeyFieldName: "foo",
    dbResourceName: "container",
    queryType: "FIND_BY_KEY",
    streamKeyFieldName: "foo"
  };

  const aMongoDBParams = {
    ...aCosmosDBParams
  };

  const aPostgresDBParams = {
    ...aCosmosDBParams
  };

  const anAPIParams = {
    authentication: {
      authHeaderName: "X-API-Key",
      authHeaderValue: "my-api-key",
    },
    endpointUrl: "endpoint_url",
    idParam: "id",
  };

  const aTableStorageParams = {
    connectionString: "table_connection_string",
    partitionKey: "part_key",
    rowKey: "row_key",
    tableName: "table_name",
  };

  const aProperBlobStorageDataSource = {
    params: aBlobStorageParams,
    type: "BlobStorage",
  };

  const aProperCosmosDBDataSource = {
    params: aCosmosDBParams,
    type: "CosmosDB", // Fix: Correct the type field to match the expected value
  };

  const aProperMongoDBDataSource = {
    params: aMongoDBParams,
    type: "MongoDB", // Fix: Correct the type field to match the expected value
  };

  const aProperPostgresDBDataSource = {
    params: aPostgresDBParams,
    type: "PosgresDB", // Fix: Correct the type field to match the expected value
  };

  const aProperAPIDataSource = {
    params: anAPIParams,
    type: "API",
  };

  const aProperTableStorageDataSource = {
    params: aTableStorageParams,
    type: "TableStorage",
  };

  it.each`
    description                   | input                                                      | success
    ${"BlobStorage (Correct)"}    | ${aProperBlobStorageDataSource}                            | ${true}
    ${"BlobStorage (Incorrect)"}  | ${{ type: "BlobStorage", params: { invalidParam: 123 } }}  | ${false}
    ${"CosmosDB (Correct)"}       | ${aProperCosmosDBDataSource}                               | ${true}
    ${"CosmosDB (Incorrect)"}     | ${{ type: "CosmosDB", params: { invalidParam: 123 } }}     | ${false}
    ${"MongoDB (Correct)"}        | ${aProperMongoDBDataSource}                                | ${true}
    ${"MongoDB (Incorrect)"}      | ${{ type: "MongoDB", params: { invalidParam: 123 } }}      | ${false}
    ${"PostgresDB (Correct)"}     | ${aProperPostgresDBDataSource}                             | ${true}
    ${"PostgresDB (Incorrect)"}   | ${{ type: "PosgresDB", params: { invalidParam: 123 } }}    | ${false}
    ${"API (Correct)"}            | ${aProperAPIDataSource}                                    | ${true}
    ${"API (Incorrect)"}          | ${{ type: "API", params: { invalidParam: 123 } }}          | ${false}
    ${"TableStorage (Correct)"}   | ${aProperTableStorageDataSource}                           | ${true}
    ${"TableStorage (Incorrect)"} | ${{ type: "TableStorage", params: { invalidParam: 123 } }} | ${false}
    ${"Empty"}                    | ${{}}                                                      | ${false}
    ${"Incorrect type"}           | ${{ type: "InvalidType" }}                                 | ${false}
  `("should $description decode properly", ({ input, success }) => {
    pipe(
      input,
      EnrichmentDataSource.decode,
      E.fold(
        () => expect(success).toBeFalsy(),
        (decoded) => expect(decoded).toEqual(input),
      ),
    );
  });
});
