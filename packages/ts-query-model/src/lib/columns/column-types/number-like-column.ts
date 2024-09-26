import { ColumnDefinition, ColumnOptions } from "../../../types/query-model.js";

export interface NumberColumn extends ColumnDefinition {
  toSQL: (valueFromJS: number) => number;
  fromSQL: (valueFromSQL: number) => number;
}

export interface NumberColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: number | null | undefined) => null | number;
  fromSQL: (valueFromSQL: null) => null | number;
}

export interface NumberColumnAutoIncrement extends ColumnDefinition {
  toSQL: (valueFromJS: number | null | undefined) => null | number;
  fromSQL: (valueFromSQL: number) => number;
}

const numberColumn = (options?: ColumnOptions<number>): NumberColumn => {
  return {
    toSQL: (valueFromJS) => valueFromJS,
    fromSQL: (valueFromSQL) => valueFromSQL,
    nullable: false,
    options,
  };
};

const numberColumnNull = (
  options?: ColumnOptions<number>
): NumberColumnNull => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL) => valueFromSQL,
    nullable: true,
    options,
  };
};

const numberColumnAutoIncrement = (
  options?: ColumnOptions<number>
): NumberColumnAutoIncrement => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL) => valueFromSQL,
    nullable: true,
    autoIncrement: true,
    options,
  };
};

export { numberColumn, numberColumnAutoIncrement, numberColumnNull };
