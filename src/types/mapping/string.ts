import * as t from "io-ts";

export const UpperCaseMapping = t.type({
  mapper: t.literal("UPPER_CASE"),
});

export type UpperCaseMapping = t.TypeOf<typeof UpperCaseMapping>;

export const LowerCaseMapping = t.type({
  mapper: t.literal("LOWER_CASE"),
});

export type LowerCaseMapping = t.TypeOf<typeof LowerCaseMapping>;

export const CapitalizeMapping = t.type({
  mapper: t.literal("CAPITALIZE"),
});

export type CapitalizeMapping = t.TypeOf<typeof CapitalizeMapping>;

export const TrimMapping = t.type({
  mapper: t.literal("TRIM"),
});

export type TrimMapping = t.TypeOf<typeof TrimMapping>;

export const ReplaceMapping = t.type({
  mapper: t.literal("REPLACE"),
  placeholder: t.string,
  toBeReplaced: t.string,
});

export type ReplaceMapping = t.TypeOf<typeof ReplaceMapping>;

export const ReplaceAllMapping = t.type({
  mapper: t.literal("REPLACE_ALL"),
  placeholder: t.string,
  toBeReplaced: t.string,
});

export type ReplaceAllMapping = t.TypeOf<typeof ReplaceAllMapping>;

export const StringMapping = t.union([
  UpperCaseMapping,
  LowerCaseMapping,
  CapitalizeMapping,
  ReplaceMapping,
  ReplaceAllMapping,
  TrimMapping,
]);

export type StringMapping = t.TypeOf<typeof StringMapping>;
