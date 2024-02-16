/* eslint-disable no-console */
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { Configuration } from "../types/configuration/configuration";

export const JSON_CONF_VAR_NAME = "JSON_CONFIGURATION";
export type JSONConfiguration = t.TypeOf<typeof JSONConfiguration>;
export const JSONConfiguration = t.type({
  JSON_CONFIGURATION: NonEmptyString,
});

export const getConfigOrThrow = (): E.Either<Error, JSONConfiguration> =>
  pipe(
    E.tryCatch(
      () =>
        JSONConfiguration.decode({
          ...process.env,
        }),
      E.toError,
    ),
    E.getOrElse(() => {
      throw new Error(`Invalid configuration`);
    }),
  );

export const readAndParseEnv = (): E.Either<Error, unknown> =>
  pipe(
    getConfigOrThrow(),
    E.chain((conf) =>
      E.tryCatch(() => {
        console.log(conf);
        return JSON.parse(conf.JSON_CONFIGURATION);
      }, E.toError),
    ),
    E.mapLeft(() => new Error(`Error during JSON reading`)),
  );

export const decodeConfiguration = (
  json: unknown,
): E.Either<Error, Configuration> =>
  pipe(
    json,
    Configuration.decode,
    E.mapLeft(() => new Error(`Error during JSON decoding`)),
  );

interface IJSONService {
  readonly read: (env: string) => E.Either<Error, unknown>;
  readonly decode: (json: unknown) => E.Either<Error, Configuration>;
}

export const JSONService: IJSONService = {
  decode: decodeConfiguration,
  read: readAndParseEnv,
} satisfies IJSONService;
