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
