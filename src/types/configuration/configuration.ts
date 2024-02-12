/* eslint-disable sort-keys */
import * as t from "io-ts";
import { DataSource } from "../datasource/datasource";
import { DataEnrichment } from "../enrichment/enrichment";
import { DataFilter } from "../filtering/filter";
import { MultipleInputMapping } from "../mapping/multipleInput";
import { SelectInputMapping } from "../mapping/selectInput";
import { SingleInputMapping } from "../mapping/singleInput";
import { DataOutput } from "../output/output";

const DataMapping = t.partial({
  singleInput: SingleInputMapping,
  multipleInput: MultipleInputMapping,
  seletInput: SelectInputMapping,
});

export type DataMappingType = t.TypeOf<typeof DataMapping>;

export const DataPipeline = t.type({
  dataSourcing: DataSource,
  dataMapping: DataMapping,
  dataEnrichment: DataEnrichment,
  dataFiltering: DataFilter,
  dataOutput: DataOutput,
});

export type DataPipelineType = t.TypeOf<typeof DataPipeline>;
