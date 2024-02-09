import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { EnrichmentDataSource } from "../enrichment/datasource";

describe("EnrichmentDataSource", () => {
  const aBlobStorageParams = {
    blobFilename: "file.txt",
    connectionString: "blob_connection_string",
    containerName: "container",
    extension: "txt",
  };

  const aDBParams = {
    connectionString: "db_connection_string",
    query: "SELECT * FROM table",
    whereConditionId: "id",
  };

  const anAPIParams = {
    authentication: {
      apiKeyHeaderName: "X-API-Key",
      apiKeyHeaderValue: "my-api-key",
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

  const aProperDBDataSource = {
    params: aDBParams,
    type: "DB",
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
    description           | input                                                     | success
    ${"BlobStorage"}      | ${aProperBlobStorageDataSource}                           | ${true}
    ${"DB"}               | ${aProperDBDataSource}                                    | ${true}
    ${"API"}              | ${aProperAPIDataSource}                                   | ${true}
    ${"TableStorage"}     | ${aProperTableStorageDataSource}                          | ${true}
    ${"Empty"}            | ${{}}                                                     | ${false}
    ${"Incorrect type"}   | ${{ type: "InvalidType" }}                                | ${false}
    ${"Incorrect params"} | ${{ type: "BlobStorage", params: { invalidParam: 123 } }} | ${false}
  `("should $description decode properly", ({ input, success }) => {
    pipe(
      input,
      EnrichmentDataSource.decode,
      E.map((decoded) => expect(decoded).toEqual(input)),
      E.mapLeft(() => expect(success).toBeFalsy()),
    );
  });
});
