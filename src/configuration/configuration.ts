import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { Configuration } from "../types/configuration/configuration";

export const readAndParseEnv = (
  envVariable: string,
): E.Either<Error, unknown> =>
  pipe(
    E.tryCatch(() => JSON.parse(process.env[envVariable]), E.toError),
    E.mapLeft(() => new Error(`Error during JSON reading and parsing`)),
  );

export const decodeConfiguration = (
  json: unknown,
): E.Either<Error, Configuration> =>
  pipe(
    json,
    Configuration.decode,
    E.mapLeft(() => new Error(`Error during JSON decoding`)),
  );
