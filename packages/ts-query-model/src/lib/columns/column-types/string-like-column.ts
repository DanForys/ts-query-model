import { ColumnDefinition, ColumnOptions } from "../../../types/query-model";

interface StringColumn extends ColumnDefinition {
  toSQL: (valueFromJS: string) => string;
  fromSQL: (valueFromSQL: string) => string;
}

interface StringColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: string | null | undefined) => string | null;
  fromSQL: (valueFromSQL: string | null) => string | null;
}

const stringColumn = (options?: ColumnOptions): StringColumn => {
  return {
    toSQL: (valueFromJS) => valueFromJS.toString(),
    fromSQL: (valueFromSQL) => `${valueFromSQL}`,
    nullable: false,
    options,
  };
};

const stringColumnNull = (options?: ColumnOptions): StringColumnNull => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined
        ? null
        : valueFromJS.toString(),
    fromSQL: (valueFromSQL) =>
      valueFromSQL === null ? null : `${valueFromSQL}`,
    nullable: true,
    options,
  };
};

export { stringColumn, stringColumnNull };
