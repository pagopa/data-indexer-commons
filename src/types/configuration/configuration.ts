/* eslint-disable sort-keys */
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { ExcludeInputExcludeFieldsMapping } from "../mapping/excludeInput";
import { QueueDataSource } from "../datasource/datasource";
import { StreamDataSource } from "../datasource/stream";
import { EnrichmentDataSource } from "../enrichment/enrichment";
import { DataFilter } from "../filtering/filter";
import { MultipleInputMapping } from "../mapping/multipleInput";
import { SelectInputMapping } from "../mapping/selectInput";
import { SingleInputMapping } from "../mapping/singleInput";
import { IndexerSinkDataSource } from "../output/output";

const DataMapping = t.union([
  SingleInputMapping,
  MultipleInputMapping,
  SelectInputMapping,
  ExcludeInputExcludeFieldsMapping,
]);

export type DataMapping = t.TypeOf<typeof DataMapping>;

export const DataTransformationStep = t.partial({
  dataMapping: t.readonlyArray(DataMapping),
  dataEnrichment: t.readonlyArray(EnrichmentDataSource),
  dataFilter: t.readonlyArray(DataFilter),
});

const DataTransformation = t.readonlyArray(DataTransformationStep);
export type DataTransformation = t.TypeOf<typeof DataTransformation>;

export const DataPipeline = t.type({
  internalQueueTopicName: NonEmptyString,
  dataSourcing: StreamDataSource,
  dataTransformation: DataTransformation,
  outputResourceName: NonEmptyString,
});

export type DataPipeline = t.TypeOf<typeof DataPipeline>;

export const Configuration = t.type({
  internalQueueDataSource: QueueDataSource,
  dataPipelines: t.readonlyArray(DataPipeline),
  sinkDataSource: IndexerSinkDataSource,
});

export type Configuration = t.TypeOf<typeof Configuration>;
