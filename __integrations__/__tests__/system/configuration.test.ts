import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as fs from "fs";
import { JSONService } from "../../../src/configuration/service";
import { validMinimumConfiguration } from "./files";

beforeAll(() => {
  const fileContent = JSON.stringify(validMinimumConfiguration);
  fs.writeFileSync(
    `${__dirname}/files/validMinimumConfiguration.json`,
    fileContent,
  );
});

afterAll(() => {
  fs.unlinkSync(`${__dirname}/files/validMinimumConfiguration.json`);
});

describe("configuration", () => {
  it("should decode a valid configuration file", async () => {
    return pipe(
      E.Do,
      E.bind("service", () => E.right(JSONService)),
      E.chain(({ service }) =>
        pipe(
          service.read(`${__dirname}/files/validMinimumConfiguration.json`),
          E.chain((json) => service.decode(json)),
        ),
      ),
      E.bimap(
        (err) => {
          throw new Error(`Error during JSON decoding: ${err.message}`);
        },
        (data) => expect(data).toEqual(validMinimumConfiguration),
      ),
    );
  });
});
