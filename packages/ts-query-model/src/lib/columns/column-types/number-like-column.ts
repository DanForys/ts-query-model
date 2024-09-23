import { ColumnDefinition, ColumnOptions } from "../../../types/query-model";

interface NumberColumn extends ColumnDefinition {
  toSQL: (valueFromJS: number) => number;
  fromSQL: (valueFromSQL: number) => number;
}

interface NumberColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: number | null | undefined) => null | number;
  fromSQL: (valueFromSQL: null) => null | number;
}

interface NumberColumnAutoIncrement extends ColumnDefinition {
  toSQL: (valueFromJS: number | null | undefined) => null | number;
  fromSQL: (valueFromSQL: number) => number;
}

const numberColumn = (options?: ColumnOptions): NumberColumn => {
  return {
    toSQL: (valueFromJS) => valueFromJS,
    fromSQL: (valueFromSQL) => valueFromSQL,
    nullable: false,
    options,
  };
};

const numberColumnNull = (options?: ColumnOptions): NumberColumnNull => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL) => valueFromSQL,
    nullable: true,
    options,
  };
};

const numberColumnAutoIncrement = (
  options?: ColumnOptions
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
