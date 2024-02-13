import * as E from "fp-ts/Either";
import { DataPipeline } from "../types/configuration/configuration";
import { decodeJSON, readJSON } from "./configuration";

interface IJSONService {
  readonly read: (path: string) => E.Either<Error, unknown>;
  readonly decode: (json: unknown) => E.Either<Error, DataPipeline>;
}

export const JSONService: IJSONService = {
  decode: decodeJSON,
  read: readJSON,
} satisfies IJSONService;
