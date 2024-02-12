import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { DataPipeline } from "../configuration";

describe("DataPipeline", () => {
  const aValidDataSourcing = {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  };

  const anInvalidDataSourcing = {
    connectionString: "foo",
    type: "INVALID",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  };

  const aValidDataOutput = {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  };

  const anInvalidDataOutput = {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "INVALID",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  };

  const aBlobStorageParams = {
    blobFilename: "file.txt",
    connectionString: "blob_connection_string",
    containerName: "container",
    extension: "txt",
  };

  const aProperBlobStorageDataSource = {
    params: aBlobStorageParams,
    type: "BlobStorage",
  };

  const aValidDataEnrichment = aProperBlobStorageDataSource;

  const anInvalidDataEnrichment = {
    params: aBlobStorageParams,
    type: "Invalid",
  };

  const aValidDataMapping = {
    dataMapping: {
      mapper: "MERGE_FIELDS",
      type: "MULTIPLE_INPUT",
      newFieldName: "mergedField",
      inputOutputFields: [
        {
          inputFieldName: "foo",
          outputFieldName: "bar",
        },
      ],
      separator: "-",
    },
  };

  const anInvalidDataMapping = {
    dataMapping: {
      mapper: "MERGE_FIELDS",
      type: "INVALID",
      newFieldName: "mergedField",
      inputOutputFields: [
        {
          inputFieldName: "foo",
          outputFieldName: "bar",
        },
      ],
      separator: "-",
    },
  };

  const aValidDataFiltering = {
    dataFiltering: { fieldName: "age", condition: "gte", staticValue: 18 },
  };

  const anInvalidDataFiltering = {
    dataFilteringInvalid: {
      fieldName: "age",
      condition: "gte",
      staticValue: 18,
    },
  };

  it.each`
    description                                                | dataSourcing             | dataMapping             | dataEnrichment             | dataFiltering             | dataOutput             | success
    ${"should decode properly with minimum valid config"}      | ${aValidDataSourcing}    | ${{}}                   | ${{}}                      | ${{}}                     | ${aValidDataOutput}    | ${true}
    ${"should decode properly with valid dataPipeline config"} | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${{}}                      | ${{}}                     | ${aValidDataOutput}    | ${true}
    ${"should decode properly with valid dataPipeline config"} | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${{}}                     | ${aValidDataOutput}    | ${true}
    ${"should decode properly with valid dataPipeline config"} | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${aValidDataOutput}    | ${true}
    ${"should fail with missing data sourcing"}                | ${{}}                    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${aValidDataOutput}    | ${false}
    ${"should fail with missing output"}                       | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${{}}                  | ${false}
    ${"should fail with invalid data sourcing"}                | ${anInvalidDataSourcing} | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${aValidDataOutput}    | ${false}
    ${"should fail with invalid data output"}                  | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${anInvalidDataOutput} | ${false}
    ${"should fail with invalid data enrichment"}              | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${anInvalidDataEnrichment} | ${aValidDataFiltering}    | ${anInvalidDataOutput} | ${false}
    ${"should fail with invalid data mapping"}                 | ${aValidDataSourcing}    | ${anInvalidDataMapping} | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${anInvalidDataOutput} | ${false}
    ${"should fail with invalid data filtering"}               | ${aValidDataSourcing}    | ${anInvalidDataMapping} | ${aValidDataEnrichment}    | ${anInvalidDataFiltering} | ${anInvalidDataOutput} | ${false}
  `(
    "$description",
    ({
      dataSourcing,
      dataMapping,
      dataEnrichment,
      dataFiltering,
      dataOutput,
      success,
    }) => {
      const dataPipelineConfig = {
        dataSourcing,
        dataMapping,
        dataEnrichment,
        dataFiltering,
        dataOutput,
      };

      pipe(
        dataPipelineConfig,
        DataPipeline.decode,
        E.fold(
          () => expect(success).toBeFalsy(),
          (decoded) => expect(decoded).toEqual(dataPipelineConfig),
        ),
      );
    },
  );
});
