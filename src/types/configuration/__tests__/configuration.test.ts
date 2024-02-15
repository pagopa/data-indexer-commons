import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { DataPipeline } from "../../configuration/configuration";
describe("DataPipeline", () => {
  const aValidDataSourcing = {
    master: {
      sourceType: "CDC",
      dbType: "CosmosDB",
      props: {
        collectionName: "exampleCollection",
        dbName: "exampleDb",
        startingFrom: "2024-02-14T00:00:00.000Z",
      },
    },
  };

  const compareValidDataSourcing = {
    master: {
      sourceType: "CDC",
      dbType: "CosmosDB",
      props: {
        collectionName: "exampleCollection",
        dbName: "exampleDb",
        startingFrom: new Date("2024-02-14T00:00:00.000Z"),
      },
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
    deduplicationStrategy: "INDEXER",
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
    fieldName: "age",
    condition: "gte",
    staticValue: 18,
  };

  const anInvalidDataFiltering = {
    dataFilteringInvalid: {
      fieldName: "age",
      condition: "gte",
      staticValue: 18,
    },
  };

  const aValidEmptyTransformationStep = {};

  const aValidTransformationStepWithOnlyMapping = {
    dataMapping: [aValidDataMapping],
  };
  const aValidTransformationStepWithOnlyEnrichment = {
    dataEnrichment: [aValidDataEnrichment],
  };
  const aValidTransformationStepWithOnlyFiltering = {
    dataFiltering: [aValidDataFiltering],
  };

  const aValidTransformationStep = {
    dataMapping: [aValidDataMapping],
    dataEnrichment: [aValidDataEnrichment],
    dataFiltering: [aValidDataFiltering],
  };

  //   ${"should decode properly with valid dataPipeline config"} | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${{}}                      | ${{}}                     | ${aValidDataOutput}    | ${true}
  // ${"should decode properly with valid dataPipeline config"} | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${{}}                     | ${aValidDataOutput}    | ${true}
  // ${"should decode properly with valid dataPipeline config"} | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${aValidDataOutput}    | ${true}
  // ${"should fail with missing data sourcing"}                | ${{}}                    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${aValidDataOutput}    | ${false}
  // ${"should fail with missing output"}                       | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${{}}                  | ${false}
  // ${"should fail with invalid data sourcing"}                | ${anInvalidDataSourcing} | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${aValidDataOutput}    | ${false}
  // ${"should fail with invalid data output"}                  | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${anInvalidDataOutput} | ${false}
  // ${"should fail with invalid data enrichment"}              | ${aValidDataSourcing}    | ${aValidDataMapping}    | ${anInvalidDataEnrichment} | ${aValidDataFiltering}    | ${anInvalidDataOutput} | ${false}
  // ${"should fail with invalid data mapping"}                 | ${aValidDataSourcing}    | ${anInvalidDataMapping} | ${aValidDataEnrichment}    | ${aValidDataFiltering}    | ${anInvalidDataOutput} | ${false}
  // ${"should fail with invalid data filtering"}               | ${aValidDataSourcing}    | ${anInvalidDataMapping} | ${aValidDataEnrichment}    | ${anInvalidDataFiltering} | ${anInvalidDataOutput} | ${false}

  it.each`
    description | dataSourcing | dataTransformation | dataOutput | dataToCompare | success
    ${"should decode properly with minimum valid config"} | ${aValidDataSourcing} | ${[aValidEmptyTransformationStep]} | ${aValidDataOutput} | ${{
  dataSourcing: compareValidDataSourcing,
  dataTransformation: [aValidEmptyTransformationStep],
  dataOutput: aValidDataOutput,
}} | ${true}
    ${"should decode properly with valid config with only mapping"} | ${aValidDataSourcing} | ${[aValidTransformationStepWithOnlyMapping]} | ${aValidDataOutput} | ${{
  dataSourcing: compareValidDataSourcing,
  dataTransformation: [aValidTransformationStepWithOnlyMapping],
  dataOutput: aValidDataOutput,
}} | ${true}
    ${"should decode properly with valid config with only enrichment"} | ${aValidDataSourcing} | ${[aValidTransformationStepWithOnlyEnrichment]} | ${aValidDataOutput} | ${{
  dataSourcing: compareValidDataSourcing,
  dataTransformation: [aValidTransformationStepWithOnlyEnrichment],
  dataOutput: aValidDataOutput,
}} | ${true}
    ${"should decode properly with valid config with only filtering"} | ${aValidDataSourcing} | ${[aValidTransformationStepWithOnlyFiltering]} | ${aValidDataOutput} | ${{
  dataSourcing: compareValidDataSourcing,
  dataTransformation: [aValidTransformationStepWithOnlyFiltering],
  dataOutput: aValidDataOutput,
}} | ${true}
    ${"should decode properly with valid config with full steps"} | ${aValidDataSourcing} | ${[aValidTransformationStep]} | ${aValidDataOutput} | ${{
  dataSourcing: compareValidDataSourcing,
  dataTransformation: [aValidTransformationStep],
  dataOutput: aValidDataOutput,
}} | ${true}
  `(
    "$description",
    ({
      dataSourcing,
      dataTransformation,
      dataOutput,
      dataToCompare,
      success,
    }) => {
      const dataPipelineConfig = {
        dataSourcing,
        dataTransformation,
        dataOutput,
      };

      pipe(
        dataPipelineConfig,
        DataPipeline.decode,
        E.fold(
          (errors) => {
            console.log(
              errors.map((error) =>
                error.context.map(({ key }) => key).join("."),
              ),
            );
            expect(success).toBeFalsy();
          },
          (decoded) => expect(decoded).toMatchObject(dataToCompare),
        ),
      );
    },
  );
});
