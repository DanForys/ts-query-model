import { ColumnDefinition } from "../../../types/query-model";

interface StringLikeColumn extends ColumnDefinition {
  toSQL: (valueFromJS: string) => string;
  fromSQL: (valueFromSQL: string) => string;
}

interface NullableStringLikeColumn extends ColumnDefinition {
  toSQL: (valueFromJS: string | null | undefined) => string | null;
  fromSQL: (valueFromSQL: string | null) => string | null;
}

const _stringColumn: StringLikeColumn = {
  toSQL: (valueFromJS) => valueFromJS.toString(),
  fromSQL: (valueFromSQL) => `${valueFromSQL}`,
};

const _nullableStringColumn: NullableStringLikeColumn = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined
      ? null
      : valueFromJS.toString(),
  fromSQL: (valueFromSQL) => (valueFromSQL === null ? null : `${valueFromSQL}`),
};

const stringColumn = () => _stringColumn;
const nullableStringColumn = () => _nullableStringColumn;

export { nullableStringColumn, stringColumn };
