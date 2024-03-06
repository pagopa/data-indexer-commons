import * as t from "io-ts";

export const SwitchCaseMapping = t.type({
  cases: t.record(t.string, t.unknown),
  defaultValue: t.unknown,
  mapper: t.literal("SWITCH_CASE"),
});

export type SwitchCaseMapping = t.TypeOf<typeof SwitchCaseMapping>;
