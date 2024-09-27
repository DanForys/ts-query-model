import { ColumnDefinition, ColumnOptions } from "../../../types/query-model";
import { getDefaultOrFallback } from "../get-default-or-fallback";

export interface JsonStringColumn<JSONShape extends object>
  extends ColumnDefinition {
  toSQL: (valueFromJS: JSONShape) => string;
  fromSQL: (valueFromSQL: string) => JSONShape;
  create: () => JSONShape;
}

export interface JsonStringColumnNull<JSONShape extends object>
  extends ColumnDefinition {
  toSQL: (valueFromJS: JSONShape | null | undefined) => string | null;
  fromSQL: (valueFromSQL: string | null) => JSONShape | null;
  create: () => JSONShape | null;
}

const jsonStringColumn = <JSONShape extends object>(
  options?: ColumnOptions<JSONShape>
): JsonStringColumn<JSONShape> => {
  return {
    toSQL: (valueFromJS: JSONShape) => JSON.stringify(valueFromJS),
    fromSQL: (valueFromSQL: string) => JSON.parse(valueFromSQL),
    create: () => getDefaultOrFallback(options?.default),
    nullable: false,
    options,
  };
};

const jsonStringColumnNull = <JSONShape extends object>(
  options?: ColumnOptions<JSONShape>
): JsonStringColumnNull<JSONShape> => {
  return {
    toSQL: (valueFromJS: JSONShape | null | undefined) =>
      valueFromJS === null || valueFromJS === undefined
        ? null
        : JSON.stringify(valueFromJS),
    fromSQL: (valueFromSQL: string | null) =>
      valueFromSQL === null ? null : JSON.parse(valueFromSQL),
    create: () => getDefaultOrFallback(options?.default, null),
    nullable: true,
    options,
  };
};

export { jsonStringColumn, jsonStringColumnNull };
