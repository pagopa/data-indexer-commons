import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { StreamDataSource } from "../stream";

const aStreamDataSourceInput = {
  master: {
    dbType: "CosmosDB",
    sourceType: "CDC",
    props: {
      collectionName: "foo",
      dbName: "db",
    },
  },
};

const aStreamQueryDataSourceComponent = {
  query: {
    dbType: "MongoDB",
    sourceType: "SELECT_ALL",
    props: { dbName: "db", resourceName: "foo" },
  },
};

const fail = (message: string) => {
  throw Error(message);
};

describe("StreamDataSource", () => {
  it("should not validate a wrong StreamDataSource input", () => {
    pipe(
      {
        ...aStreamDataSourceInput,
        ...aStreamDataSourceInput.master,
        master: undefined,
      },
      StreamDataSource.decode,
      E.bimap(
        (errs) => {
          expect(errs).toBeDefined();
        },
        () => fail("Cannot decode a wrong input"),
      ),
    );
  });

  it("should not validate a StreamDataSource that contains only query component", () => {
    pipe(
      aStreamQueryDataSourceComponent,
      StreamDataSource.decode,
      E.bimap(
        (errs) => {
          expect(errs).toBeDefined();
        },
        () => fail("Cannot decode input that contains only query component"),
      ),
    );
  });

  it("should validate a StreamDataSource with master component", () => {
    pipe(
      aStreamDataSourceInput,
      StreamDataSource.decode,
      E.bimap(
        () => fail("Should not fail"),
        (streamDataSource) => {
          expect(streamDataSource).toEqual(aStreamDataSourceInput);
          expect(streamDataSource.query).toBeUndefined();
        },
      ),
    );
  });

  it("should validate a StreamDataSource with master and query component", () => {
    pipe(
      { ...aStreamDataSourceInput, ...aStreamQueryDataSourceComponent },
      StreamDataSource.decode,
      E.bimap(
        () => fail("Should not fail"),
        (streamDataSource) => {
          expect(streamDataSource.master).toEqual(
            aStreamDataSourceInput.master,
          );
          expect(streamDataSource.query).toBeDefined();
        },
      ),
    );
  });
});
