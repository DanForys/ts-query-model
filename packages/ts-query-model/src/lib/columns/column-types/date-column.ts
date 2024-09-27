import { ColumnDefinition, ColumnOptions } from "../../../types/query-model";
import { getDefaultOrFallback } from "../get-default-or-fallback";

export interface DateColumn extends ColumnDefinition {
  toSQL: (valueFromJS: Date) => Date;
  fromSQL: (valueFromSQL: Date) => Date;
  create: () => Date;
}

export interface DateColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: Date | null | undefined) => Date | null;
  fromSQL: (valueFromSQL: Date | null) => Date | null;
  create: () => Date | null;
}

const dateColumn = (options?: ColumnOptions<Date>): DateColumn => {
  return {
    toSQL: (valueFromJS) => valueFromJS,
    fromSQL: (valueFromSQL) => valueFromSQL,
    create: () => getDefaultOrFallback(options?.default),
    nullable: false,
    options,
  };
};

const dateColumnNull = (options?: ColumnOptions<Date>): DateColumnNull => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL) => (valueFromSQL === null ? null : valueFromSQL),
    create: () => getDefaultOrFallback(options?.default, null),
    nullable: true,
    options,
  };
};

export { dateColumn, dateColumnNull };
