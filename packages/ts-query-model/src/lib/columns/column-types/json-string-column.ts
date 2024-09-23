import { ColumnDefinition, ColumnOptions } from "../../../types/query-model";

interface JsonStringColumn<JSONShape extends object> extends ColumnDefinition {
  toSQL: (valueFromJS: JSONShape) => string;
  fromSQL: (valueFromSQL: string) => JSONShape;
}

interface JsonStringColumnNull<JSONShape extends object>
  extends ColumnDefinition {
  toSQL: (valueFromJS: JSONShape | null | undefined) => string | null;
  fromSQL: (valueFromSQL: string | null) => JSONShape | null;
}

const jsonStringColumn = <JSONShape extends object>(
  options?: ColumnOptions
): JsonStringColumn<JSONShape> => {
  return {
    toSQL: (valueFromJS: JSONShape) => JSON.stringify(valueFromJS),
    fromSQL: (valueFromSQL: string) => JSON.parse(valueFromSQL),
    nullable: false,
    options,
  };
};

const jsonStringColumnNull = <JSONShape extends object>(
  options?: ColumnOptions
): JsonStringColumnNull<JSONShape> => {
  return {
    toSQL: (valueFromJS: JSONShape | null | undefined) =>
      valueFromJS === null || valueFromJS === undefined
        ? null
        : JSON.stringify(valueFromJS),
    fromSQL: (valueFromSQL: string | null) =>
      valueFromSQL === null ? null : JSON.parse(valueFromSQL),
    nullable: true,
    options,
  };
};

export { jsonStringColumn, jsonStringColumnNull };
