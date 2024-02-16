/* eslint-disable no-console */
import { errorsToReadableMessages } from "@pagopa/ts-commons/lib/reporters";
import * as E from "fp-ts/Either";
import * as J from "fp-ts/Json";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { Configuration } from "../types/configuration/configuration";

export const CONFIG_VAR_NAME = "CONFIGURATION";
export type EnvConfiguration = t.TypeOf<typeof EnvConfiguration>;
export const EnvConfiguration = t.type({
  CONFIGURATION: NonEmptyString,
});

export const getConfigOrThrow = (): E.Either<Error, EnvConfiguration> =>
  pipe(
    EnvConfiguration.decode({
      ...process.env,
      CONFIGURATION: pipe(
        process.env[CONFIG_VAR_NAME],
        J.parse,
        E.getOrElse(() => ""),
      ),
    }),
    E.mapLeft((errs) => {
      throw new Error(
        `Invalid configuration|ERROR=${errorsToReadableMessages(errs)}`,
      );
    }),
  );

export const readAndParseEnv = (): E.Either<Error, unknown> =>
  pipe(
    getConfigOrThrow(),
    E.chain((conf) =>
      E.tryCatch(() => {
        console.log(conf);
        return JSON.parse(conf.CONFIGURATION);
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
