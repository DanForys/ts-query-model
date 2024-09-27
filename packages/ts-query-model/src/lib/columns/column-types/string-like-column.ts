import { ColumnDefinition, ColumnOptions } from "../../../types/query-model";
import { getDefaultOrFallback } from "../get-default-or-fallback";

export interface StringColumn extends ColumnDefinition {
  toSQL: (valueFromJS: string) => string;
  fromSQL: (valueFromSQL: string) => string;
  create: () => string;
}

export interface StringColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: string | null | undefined) => string | null;
  fromSQL: (valueFromSQL: string | null) => string | null;
  create: () => string | null;
}

const stringColumn = (options?: ColumnOptions<string>): StringColumn => {
  return {
    toSQL: (valueFromJS) => valueFromJS.toString(),
    fromSQL: (valueFromSQL) => `${valueFromSQL}`,
    create: () => getDefaultOrFallback(options?.default),
    nullable: false,
    options,
  };
};

const stringColumnNull = (
  options?: ColumnOptions<string>
): StringColumnNull => {
  return {
    toSQL: (valueFromJS) =>
      valueFromJS === null || valueFromJS === undefined
        ? null
        : valueFromJS.toString(),
    fromSQL: (valueFromSQL) =>
      valueFromSQL === null ? null : `${valueFromSQL}`,
    create: () => getDefaultOrFallback(options?.default, null),
    nullable: true,
    options,
  };
};

export { stringColumn, stringColumnNull };
