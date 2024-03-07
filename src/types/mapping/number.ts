import * as t from "io-ts";

export const MultiplyMapping = t.type({
  mapper: t.literal("MULTIPLY_NUMBER"),
  multiplier: t.number,
});

export type MultiplyMapping = t.TypeOf<typeof MultiplyMapping>;

export const DivideMapping = t.type({
  divider: t.number,
  mapper: t.literal("DIVIDE_NUMBER"),
});

export type DivideMapping = t.TypeOf<typeof DivideMapping>;

export const RoundMapping = t.type({
  decimals: t.number,
  mapper: t.literal("ROUND_NUMBER"),
});

export type RoundMapping = t.TypeOf<typeof RoundMapping>;

export const NumberMapping = t.union([
  DivideMapping,
  RoundMapping,
  MultiplyMapping,
]);

export type NumberMapping = t.TypeOf<typeof NumberMapping>;
