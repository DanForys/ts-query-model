import { ColumnDefinition, ColumnOptions } from "../../../types/query-model.js";

export interface BooleanIntColumn extends ColumnDefinition {
  toSQL: (valueFromJS: boolean) => number;
  fromSQL: (valueFromSQL: number) => boolean;
}

export interface NullableBooleanIntColumn extends ColumnDefinition {
  toSQL: (valueFromJS: boolean | null | undefined) => null | number;
  fromSQL: (valueFromSQL: number | null) => boolean | null;
}

const booleanIntColumn = (
  options?: ColumnOptions<number>
): BooleanIntColumn => {
  return {
    toSQL: (valueFromJS) => (valueFromJS ? 1 : 0),
    fromSQL: (valueFromSQL) => Boolean(valueFromSQL),
    nullable: false,
    options,
  };
};

const booleanIntColumnNull = (
  options?: ColumnOptions<number>
): NullableBooleanIntColumn => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined
        ? null
        : valueFromJS
        ? 1
        : 0,
    fromSQL: (valueFromSQL) =>
      valueFromSQL === null ? null : Boolean(valueFromSQL),
    nullable: true,
    options,
  };
};

export { booleanIntColumn, booleanIntColumnNull };
