import * as E from "fp-ts/Either";
import { CONFIG_VAR_NAME, readAndParseEnv } from "../service";

const jsonData = {
  internalQueueDataSource: {
    connectionString: "your_connection_string_here",
    props: {
      clientId: "your_client_id_here",
      groupId: "your_group_id_here",
    },
    queueType: "EVENT_HUB",
    type: "QUEUE",
  },
  dataPipelines: [
    {
      dataSourcing: {
        master: {
          sourceType: "CDC",
          dbType: "CosmosDB",
          props: {
            collectionName: "exampleCollection",
            dbName: "exampleDb",
            startingFrom: "2024-02-14T00:00:00.000Z",
          },
        },
      },
      outputResourceName: "indexName",
      dataTransformation: [{}],
      internalQueueTopicName: "internalQueueTopicName",
    },
  ],
  sinkDataSource: {
    connectionString: "your_connection_string_here",
    indexer: "ELASTICSEARCH",
    type: "DATA_OUTPUT",
  },
};

const comparedData = {
  internalQueueDataSource: {
    connectionString: "your_connection_string_here",
    props: {
      clientId: "your_client_id_here",
      groupId: "your_group_id_here",
    },
    queueType: "EVENT_HUB",
    type: "QUEUE",
  },
  dataPipelines: [
    {
      dataSourcing: {
        master: {
          sourceType: "CDC",
          dbType: "CosmosDB",
          props: {
            collectionName: "exampleCollection",
            dbName: "exampleDb",
            startingFrom: new Date("2024-02-14T00:00:00.000Z"),
          },
        },
      },
      outputResourceName: "indexName",
      dataTransformation: [{}],
      internalQueueTopicName: "internalQueueTopicName",
    },
  ],
  sinkDataSource: {
    connectionString: "your_connection_string_here",
    indexer: "ELASTICSEARCH",
    type: "DATA_OUTPUT",
  },
};

beforeAll(() => {
  process.env[CONFIG_VAR_NAME] = JSON.stringify(jsonData);
});

describe("readAndParseEnv", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should read and parse JSON file successfully", () => {
    expect(readAndParseEnv()).toEqual(E.right({ CONFIGURATION: comparedData }));
  });

  it("should return Left with error if reading or parsing fails", () => {
    process.env[CONFIG_VAR_NAME] = "invalid-json";

    const result = readAndParseEnv();

    expect(E.isLeft(result)).toBeTruthy();
  });
});
