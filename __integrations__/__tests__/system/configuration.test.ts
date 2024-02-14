import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as fs from "fs";
import { JSONService } from "../../../src/configuration/service";
import {
  anInvalidDataEnrichment,
  anInvalidDataFiltering,
  anInvalidDataMapping,
  anInvalidDataOutput,
  anInvalidDataSourcing,
  missingDataOutput,
  missingDataSourcing,
  validConfigurationWithEnrichment,
  validConfigurationWithFiltering,
  validConfigurationWithMapping,
  validFullConfiguration,
  validMinimumConfiguration,
} from "./files";

export const configurations = [
  {
    name: "validMinimumConfiguration",
    configuration: validMinimumConfiguration,
  },
  {
    name: "validConfigurationWithMapping",
    configuration: validConfigurationWithMapping,
  },
  {
    name: "validConfigurationWithEnrichment",
    configuration: validConfigurationWithEnrichment,
  },
  {
    name: "validConfigurationWithFiltering",
    configuration: validConfigurationWithFiltering,
  },
  { name: "validFullConfiguration", configuration: validFullConfiguration },
  { name: "missingDataSourcing", configuration: missingDataSourcing },
  { name: "missingDataOutput", configuration: missingDataOutput },
  { name: "anInvalidDataSourcing", configuration: anInvalidDataSourcing },
  { name: "anInvalidDataOutput", configuration: anInvalidDataOutput },
  { name: "anInvalidDataEnrichment", configuration: anInvalidDataEnrichment },
  { name: "anInvalidDataMapping", configuration: anInvalidDataMapping },
  { name: "anInvalidDataFiltering", configuration: anInvalidDataFiltering },
];

beforeAll(() => {
  configurations.forEach(({ name, configuration }) => {
    fs.writeFileSync(
      `${__dirname}/${name}.json`,
      JSON.stringify(configuration),
    );
  });
});

afterAll(() => {
  configurations.forEach(({ name }) => {
    fs.unlinkSync(`${__dirname}/${name}.json`);
  });
});

describe("configuration", () => {
  it.each`
    description                                                          | filename                              | configuration                       | success
    ${"should decode properly with minimum valid config"}                | ${"validMinimumConfiguration"}        | ${validMinimumConfiguration}        | ${true}
    ${"should decode properly with valid configuration with mapping"}    | ${"validConfigurationWithMapping"}    | ${validConfigurationWithMapping}    | ${true}
    ${"should decode properly with valid configuration with enrichment"} | ${"validConfigurationWithEnrichment"} | ${validConfigurationWithEnrichment} | ${true}
    ${"should decode properly with valid configuration with filtering"}  | ${"validConfigurationWithFiltering"}  | ${validConfigurationWithFiltering}  | ${true}
    ${"should decode properly with valid full configuration"}            | ${"validFullConfiguration"}           | ${validFullConfiguration}           | ${true}
    ${"should fail with missing data sourcing"}                          | ${"missingDataSourcing"}              | ${missingDataSourcing}              | ${false}
    ${"should fail with missing output"}                                 | ${"missingDataOutput"}                | ${missingDataOutput}                | ${false}
    ${"should fail with invalid data sourcing"}                          | ${"anInvalidDataSourcing"}            | ${anInvalidDataSourcing}            | ${false}
    ${"should fail with invalid data output"}                            | ${"anInvalidDataOutput"}              | ${anInvalidDataOutput}              | ${false}
    ${"should fail with invalid data enrichment"}                        | ${"anInvalidDataEnrichment"}          | ${anInvalidDataEnrichment}          | ${false}
    ${"should fail with invalid data mapping"}                           | ${"anInvalidDataMapping"}             | ${anInvalidDataMapping}             | ${false}
    ${"should fail with invalid data filtering"}                         | ${"anInvalidDataFiltering"}           | ${anInvalidDataFiltering}           | ${false}
  `("$description", ({ filename, configuration, success }) => {
    return pipe(
      E.Do,
      E.bind("service", () => E.right(JSONService)),
      E.chain(({ service }) =>
        pipe(
          service.read(`${__dirname}/${filename}.json`),
          E.chain((json) => service.decode(json)),
        ),
      ),
      E.fold(
        () => {
          expect(success).toBeFalsy();
        },
        (data) => {
          expect(data).toEqual(configuration);
        },
      ),
    );
  });
});
