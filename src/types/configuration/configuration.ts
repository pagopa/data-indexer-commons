/* eslint-disable sort-keys */
import * as t from "io-ts";
import { DataSource } from "../datasource/datasource";
import { EnrichmentDataSource } from "../enrichment/enrichment";
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

export type DataMapping = t.TypeOf<typeof DataMapping>;

const DataEnrichment = t.partial({ EnrichmentDataSource });

export const DataPipeline = t.type({
  dataSourcing: DataSource,
  dataMapping: DataMapping,
  dataEnrichment: DataEnrichment,
  dataFiltering: DataFilter,
  dataOutput: DataOutput,
});

export type DataPipeline = t.TypeOf<typeof DataPipeline>;
