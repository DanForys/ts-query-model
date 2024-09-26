import { ColumnDefinition, ColumnOptions } from "../../../types/query-model.js";

export interface DateColumn extends ColumnDefinition {
  toSQL: (valueFromJS: Date) => Date;
  fromSQL: (valueFromSQL: Date) => Date;
}

export interface DateColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: Date | null | undefined) => Date | null;
  fromSQL: (valueFromSQL: Date | null) => Date | null;
}

const dateColumn = (options?: ColumnOptions<Date>): DateColumn => {
  return {
    toSQL: (valueFromJS) => valueFromJS,
    fromSQL: (valueFromSQL) => valueFromSQL,
    nullable: false,
    options,
  };
};

const dateColumnNull = (options?: ColumnOptions<Date>): DateColumnNull => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL) => (valueFromSQL === null ? null : valueFromSQL),
    nullable: true,
    options,
  };
};

export { dateColumn, dateColumnNull };
