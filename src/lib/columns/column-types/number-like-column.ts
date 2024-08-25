import { ColumnDefinition } from "../../../types/query-model";

interface NumberLikeColumn extends ColumnDefinition {
  toSQL: (valueFromJS: number) => number;
  fromSQL: (valueFromSQL: number) => number;
}

interface NullableNumberLikeColumn extends ColumnDefinition {
  toSQL: (valueFromJS: number | null | undefined) => null | number;
  fromSQL: (valueFromSQL: null) => null | number;
}

interface AutoIncrementNumberLikeColumn extends ColumnDefinition {
  toSQL: (valueFromJS: number | null | undefined) => null | number;
  fromSQL: (valueFromSQL: number) => number;
}

const _numberColumn: NumberLikeColumn = {
  toSQL: (valueFromJS) => valueFromJS,
  fromSQL: (valueFromSQL) => valueFromSQL,
};

const _nullableNumberColumn: NullableNumberLikeColumn = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
  fromSQL: (valueFromSQL) => valueFromSQL,
};

const _autoIncrementNumberColumn: AutoIncrementNumberLikeColumn = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
  fromSQL: (valueFromSQL) => valueFromSQL,
};

const numberColumn = () => _numberColumn;
const nullableNumberColumn = () => _nullableNumberColumn;
const autoIncrementNumberColumn = () => _autoIncrementNumberColumn;

export { autoIncrementNumberColumn, nullableNumberColumn, numberColumn };
