/* eslint-disable no-console */
import { errorsToReadableMessages } from "@pagopa/ts-commons/lib/reporters";
import * as E from "fp-ts/Either";
import * as J from "fp-ts/Json";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { Configuration } from "../types/configuration/configuration";

export const CONFIG_VAR_NAME = "CONFIGURATION";
export type EnvConfiguration = t.TypeOf<typeof EnvConfiguration>;
export const EnvConfiguration = t.type({
  CONFIGURATION: Configuration,
});

export const readAndParseEnv = (): E.Either<Error, EnvConfiguration> =>
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
