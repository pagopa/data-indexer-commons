export const validMinimumConfiguration = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {},
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const validConfigurationWithMapping = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
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
  dataEnrichment: {},
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const validConfigurationWithEnrichment = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {
    params: {
      blobFilename: "file.txt",
      connectionString: "blob_connection_string",
      containerName: "container",
      extension: "txt",
    },
    type: "BlobStorage",
  },
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const validConfigurationWithFiltering = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {},
  dataFiltering: {
    dataFiltering: { fieldName: "age", condition: "gte", staticValue: 18 },
  },
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const validFullConfiguration = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
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
  dataEnrichment: {
    params: {
      blobFilename: "file.txt",
      connectionString: "blob_connection_string",
      containerName: "container",
      extension: "txt",
    },
    type: "BlobStorage",
  },
  dataFiltering: {
    dataFiltering: { fieldName: "age", condition: "gte", staticValue: 18 },
  },
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const missingDataSourcing = {
  dataSourcing: {},
  dataMapping: {},
  dataEnrichment: {},
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const missingDataOutput = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {},
  dataFiltering: {},
  dataOutput: {},
};

export const anInvalidDataSourcing = {
  dataSourcing: {
    connectionString: "foo",
    type: "INVALID",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {},
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const anInvalidDataOutput = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {},
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "INVALID",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const anInvalidDataEnrichment = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {
    params: {
      blobFilename: "file.txt",
      connectionString: "blob_connection_string",
      containerName: "container",
      extension: "txt",
    },
    type: "INVALID",
  },
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const anInvalidDataMapping = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
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
  dataEnrichment: {},
  dataFiltering: {},
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};

export const anInvalidDataFiltering = {
  dataSourcing: {
    connectionString: "foo",
    type: "DB",
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "collName",
      dbName: "dbName",
      leaseContainerName: "lease",
    },
  },
  dataMapping: {},
  dataEnrichment: {},
  dataFiltering: {
    dataFilteringInvalid: {
      fieldName: "age",
      condition: "gte",
      staticValue: 18,
    },
  },
  dataOutput: {
    connectionString: "connectionString",
    indexName: "indexName",
    type: "DATA_OUTPUT",
    indexer: "ELASTICSEARCH",
    deduplicationStrategy: "TIMESTAMP",
  },
};
