/* eslint-disable sort-keys */
import * as t from "io-ts";
import { StreamDataSource } from "../datasource/stream";
import { EnrichmentDataSource } from "../enrichment/enrichment";
import { DataFilter } from "../filtering/filter";
import { MultipleInputMapping } from "../mapping/multipleInput";
import { SelectInputMapping } from "../mapping/selectInput";
import { SingleInputMapping } from "../mapping/singleInput";
import { DataOutput } from "../output/output";

const DataMapping = t.union([
  SingleInputMapping,
  MultipleInputMapping,
  SelectInputMapping,
]);

export type DataMapping = t.TypeOf<typeof DataMapping>;

export const DataTransformationStep = t.array(
  t.partial({
    dataMapping: t.array(DataMapping),
    dataEnrichment: t.array(EnrichmentDataSource),
    dataFilter: t.array(DataFilter),
  }),
);

export const DataPipeline = t.type({
  dataSourcing: StreamDataSource,
  dataTransformation: DataTransformationStep,
  dataOutput: DataOutput,
});

export type DataPipeline = t.TypeOf<typeof DataPipeline>;
