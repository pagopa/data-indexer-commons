import * as fs from "fs";

import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { DataPipeline } from "../types/configuration/configuration";

export const readJSON = (path: string): E.Either<Error, unknown> =>
  pipe(
    E.tryCatch(() => fs.readFileSync(path), E.toError),
    E.map((res) => JSON.parse(res.toString())),
    E.mapLeft(() => new Error(`Error during JSON reading`)),
  );

export const decodeJSON = (json: unknown): E.Either<Error, DataPipeline> =>
  pipe(
    json,
    DataPipeline.decode,
    E.mapLeft(() => new Error(`Error during JSON decoding`)),
  );
