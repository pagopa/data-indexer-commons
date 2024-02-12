/* eslint-disable sort-keys */
import * as t from "io-ts";
import { DataSource } from "../datasource/datasource";
import { MultipleInputMapping } from "../mapping/multipleInput";
import { SelectInputMapping } from "../mapping/selectInput";
import { SingleInputMapping } from "../mapping/singleInput";

const DataMapping = t.partial({
  singleInput: SingleInputMapping,
  multipleInput: MultipleInputMapping,
  seletInput: SelectInputMapping,
});

export type DataMappingType = t.TypeOf<typeof DataMapping>;

export const DataPipeline = t.type({
  dataSourcing: DataSource,
  // dataMapping: DataMapping,
  // dataEnrichment: EnrichmentDataSource,
  // dataFiltering: DataFilter,
  // dataOutput: DataOutput,
});

export type DataPipeline = t.TypeOf<typeof DataPipeline>;
