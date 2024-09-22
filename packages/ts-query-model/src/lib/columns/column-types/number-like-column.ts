import { ColumnDefinition } from "../../../types/query-model";

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

const _numberColumn: NumberColumn = {
  toSQL: (valueFromJS) => valueFromJS,
  fromSQL: (valueFromSQL) => valueFromSQL,
  nullable: false,
};

const _nullableNumberColumn: NumberColumnNull = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
  fromSQL: (valueFromSQL) => valueFromSQL,
  nullable: true,
};

const _autoIncrementNumberColumn: NumberColumnAutoIncrement = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
  fromSQL: (valueFromSQL) => valueFromSQL,
  nullable: true,
};

const numberColumn = () => _numberColumn;
const numberColumnNull = () => _nullableNumberColumn;
const numberColumnAutoIncrement = () => _autoIncrementNumberColumn;

export { numberColumn, numberColumnAutoIncrement, numberColumnNull };
