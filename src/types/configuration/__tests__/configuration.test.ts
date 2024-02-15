import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { Configuration } from "../../configuration/configuration";

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

  const anInvalidDataPipelineWithoutDataSourcing = {
    outputResourceName: "indexName",
    dataTransformation: [{}],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const anInvalidDataPipelineWithInvalidDataSourcing = {
    dataSourcing: anInvalidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{}],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const anInvalidDataPipelineWithInvalidDataMapping = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{ dataMapping: [anInvalidDataMapping] }],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const anInvalidDataPipelineWithInvalidDataEnrichment = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{ dataEnrichment: anInvalidDataEnrichment }],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const anInvalidDataPipelineWithInvalidDataFilter = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{ dataFilter: anInvalidDataFiltering }],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const anInvalidDataPipelineWithoutInternalQueueTopicName = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{}],
  };

  const anInvalidDataPipelineWithoutOutputResourceName = {
    dataSourcing: aValidDataSourcing,
    dataTransformation: [{}],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const aMinValidDataPipeline = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{}],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const aMinValidDataPipelineToCompare = {
    dataSourcing: compareValidDataSourcing,
    outputResourceName: "indexName",
    internalQueueTopicName: "internalQueueTopicName",
    dataTransformation: [{}],
  };

  const aValidDataPipelineWithMapping = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{ dataMapping: [aValidDataMapping] }],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const aValidDataPipelineWithMappingToCompare = {
    dataSourcing: compareValidDataSourcing,
    outputResourceName: "indexName",
    internalQueueTopicName: "internalQueueTopicName",
    dataTransformation: [{ dataMapping: [aValidDataMapping] }],
  };

  const aValidDataPipelineWithEnrichment = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{ dataEnrichment: [aValidDataEnrichment] }],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const aValidDataPipelineWithEnrichmentToCompare = {
    dataSourcing: compareValidDataSourcing,
    outputResourceName: "indexName",
    internalQueueTopicName: "internalQueueTopicName",
    dataTransformation: [{ dataEnrichment: [aValidDataEnrichment] }],
  };
  const aValidDataPipelineWithFilter = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [{ dataFilter: [aValidDataFiltering] }],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const aValidDataPipelineWithFilterToCompare = {
    dataSourcing: compareValidDataSourcing,
    outputResourceName: "indexName",
    internalQueueTopicName: "internalQueueTopicName",
    dataTransformation: [{ dataFilter: [aValidDataFiltering] }],
  };

  const aFullValidDataPipeline = {
    dataSourcing: aValidDataSourcing,
    outputResourceName: "indexName",
    dataTransformation: [
      { dataFilter: [aValidDataFiltering] },
      { dataEnrichment: [aValidDataEnrichment] },
      { dataMapping: [aValidDataMapping] },
    ],
    internalQueueTopicName: "internalQueueTopicName",
  };

  const aFullValidDataPipelineToCompare = {
    dataSourcing: compareValidDataSourcing,
    outputResourceName: "indexName",
    internalQueueTopicName: "internalQueueTopicName",
    dataTransformation: [
      { dataFilter: [aValidDataFiltering] },
      { dataEnrichment: [aValidDataEnrichment] },
      { dataMapping: [aValidDataMapping] },
    ],
  };

  const aValidQueueDataSource = {
    connectionString: "your_connection_string_here",
    props: {
      clientId: "your_client_id_here",
      groupId: "your_group_id_here",
    },
    queueType: "EVENT_HUB",
    type: "QUEUE",
  };

  const aValidIndexerSinkDataSource = {
    connectionString: "your_connection_string_here",
    indexer: "ELASTICSEARCH",
    type: "DATA_OUTPUT",
  };

  const anInvalidConfigurationWithoutInternalQueueDataSource = {
    dataPipelines: [aMinValidDataPipeline],
    sinkDataSource: aValidIndexerSinkDataSource,
  };

  const anInvalidConfigurationWithoutDataPipelines = {
    internalQueueDataSource: aValidQueueDataSource,
    sinkDataSource: aValidIndexerSinkDataSource,
  };

  const anInvalidConfigurationWithoutSinkDataSource = {
    internalQueueDataSource: aValidQueueDataSource,
    dataPipelines: [aMinValidDataPipeline],
  };
  it.each`
    description                                                       | dataPipeline                                          | dataToCompare                                | success
    ${"should decode properly with minimum valid config"}             | ${aMinValidDataPipeline}                              | ${aMinValidDataPipelineToCompare}            | ${true}
    ${"should decode properly with valid config - only mapping"}      | ${aValidDataPipelineWithMapping}                      | ${aValidDataPipelineWithMappingToCompare}    | ${true}
    ${"should decode properly with valid config - only enrichment"}   | ${aValidDataPipelineWithEnrichment}                   | ${aValidDataPipelineWithEnrichmentToCompare} | ${true}
    ${"should decode properly with valid config - only filtering"}    | ${aValidDataPipelineWithFilter}                       | ${aValidDataPipelineWithFilterToCompare}     | ${true}
    ${"should decode properly with a full valid config"}              | ${aFullValidDataPipeline}                             | ${aFullValidDataPipelineToCompare}           | ${true}
    ${"should decode properly with a missing dataSource"}             | ${anInvalidDataPipelineWithoutDataSourcing}           | ${aFullValidDataPipelineToCompare}           | ${false}
    ${"should decode properly with an invalid dataSource"}            | ${anInvalidDataPipelineWithInvalidDataSourcing}       | ${aFullValidDataPipelineToCompare}           | ${false}
    ${"should decode properly with an invalid dataMapping"}           | ${anInvalidDataPipelineWithInvalidDataMapping}        | ${aFullValidDataPipelineToCompare}           | ${false}
    ${"should decode properly with an invalid dataEnrichment"}        | ${anInvalidDataPipelineWithInvalidDataEnrichment}     | ${aFullValidDataPipelineToCompare}           | ${false}
    ${"should decode properly with an invalid dataFilter"}            | ${anInvalidDataPipelineWithInvalidDataFilter}         | ${aFullValidDataPipelineToCompare}           | ${false}
    ${"should decode properly with a missing internalQueueTopicName"} | ${anInvalidDataPipelineWithoutInternalQueueTopicName} | ${aFullValidDataPipelineToCompare}           | ${false}
    ${"should decode properly with a missing outputResourceName"}     | ${anInvalidDataPipelineWithoutOutputResourceName}     | ${aFullValidDataPipelineToCompare}           | ${false}
  `("$description", ({ dataPipeline, dataToCompare, success }) => {
    const configuration = {
      internalQueueDataSource: aValidQueueDataSource,
      dataPipelines: [dataPipeline],
      sinkDataSource: aValidIndexerSinkDataSource,
    };
    pipe(
      configuration,
      Configuration.decode,
      E.fold(
        (errors) => {
          console.log(
            errors.map((error) =>
              error.context.map(({ key }) => key).join("."),
            ),
          );
          expect(success).toBeFalsy();
        },
        (decoded) =>
          expect(decoded).toMatchObject({
            internalQueueDataSource: aValidQueueDataSource,
            dataPipelines: [dataToCompare],
            sinkDataSource: aValidIndexerSinkDataSource,
          }),
      ),
    );
  });

  it.each`
    description                                                              | configuration                                           | success
    ${"should decode invalid configuration without internalQueueDataSource"} | ${anInvalidConfigurationWithoutInternalQueueDataSource} | ${false}
    ${"should decode invalid configuration without DataPipelines"}           | ${anInvalidConfigurationWithoutDataPipelines}           | ${false}
    ${"should decode invalid configuration without SinkDataSource"}          | ${anInvalidConfigurationWithoutSinkDataSource}          | ${false}
  `("$description", ({ configuration, success }) => {
    pipe(
      configuration,
      Configuration.decode,
      E.fold(
        (errors) => {
          console.log(
            errors.map((error) =>
              error.context.map(({ key }) => key).join("."),
            ),
          );
          expect(success).toBeFalsy();
        },
        (decoded) => expect(decoded).toMatchObject(configuration),
      ),
    );
  });
});
