import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { DataPipeline } from "../configuration";

describe("DataPipeline", () => {
  const validDataSourcing = { connectionString: "validConnectionString" };
  const validDataEnrichment = { enrichmentType: "validEnrichmentType" };
  const validDataOutput = { outputType: "validOutputType" };
  const invalidDataMapping = {};

  it.each`
    description                                                | dataSourcing         | dataMapping  | dataEnrichment | dataFiltering | dataOutput         | success
    ${"should decode properly with valid dataPipeline config"} | ${validDataSourcing} | ${undefined} | ${undefined}   | ${undefined}  | ${validDataOutput} | ${true}
  `(
    "$description",
    ({
      dataSourcing,
      dataMapping,
      dataEnrichment,
      dataFiltering,
      dataOutput,
      success,
    }) => {
      const dataPipelineConfig = {
        dataSourcing,
        dataMapping,
        dataEnrichment,
        dataFiltering,
        dataOutput,
      };

      pipe(
        dataPipelineConfig,
        DataPipeline.decode,
        E.map((decoded) => expect(decoded).toEqual(dataPipelineConfig)),
        E.mapLeft(() => {
          throw new Error("Should decode succsfully DataPipeline");
        }),
      );
    },
  );
});
