import { ColumnDefinition } from "../../../types/query-model";

interface JsonColumn<JSONShape extends object> extends ColumnDefinition {
  toSQL: (valueFromJS: JSONShape) => string;
  fromSQL: (valueFromSQL: string) => JSONShape;
}

interface NullablejsonColumn<JSONShape extends object>
  extends ColumnDefinition {
  toSQL: (valueFromJS: JSONShape | null | undefined) => string | null;
  fromSQL: (valueFromSQL: string | null) => JSONShape | null;
}

const jsonColumn = <JSONShape extends object>() => {
  return {
    toSQL: (valueFromJS: JSONShape) => JSON.stringify(valueFromJS),
    fromSQL: (valueFromSQL: string) => JSON.parse(valueFromSQL),
  } as JsonColumn<JSONShape>;
};

const nullableJsonColumn = <JSONShape extends object>() => {
  return {
    toSQL: (valueFromJS: JSONShape | null) =>
      valueFromJS === null || valueFromJS === undefined
        ? null
        : JSON.stringify(valueFromJS),
    fromSQL: (valueFromSQL: string | null) =>
      valueFromSQL === null ? null : JSON.parse(valueFromSQL),
  } as NullablejsonColumn<JSONShape>;
};

export { jsonColumn, nullableJsonColumn };
