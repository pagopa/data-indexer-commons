import * as E from "fp-ts/Either";
import { Configuration } from "../types/configuration/configuration";
import { decodeConfiguration, readAndParseEnv } from "./configuration";

interface IJSONService {
  readonly read: (env: string) => E.Either<Error, unknown>;
  readonly decode: (json: unknown) => E.Either<Error, Configuration>;
}

export const JSONService: IJSONService = {
  decode: decodeConfiguration,
  read: readAndParseEnv,
} satisfies IJSONService;
