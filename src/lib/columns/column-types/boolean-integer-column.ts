import { ColumnDefinition } from "../../../types/query-model";

interface BooleanLikeColumn extends ColumnDefinition {
  toSQL: (valueFromJS: boolean) => number;
  fromSQL: (valueFromSQL: number) => boolean;
}

interface NullableBooleanLikeColumn extends ColumnDefinition {
  toSQL: (valueFromJS: boolean | null | undefined) => null | number;
  fromSQL: (valueFromSQL: number | null) => boolean | null;
}

const _booleanColumn: BooleanLikeColumn = {
  toSQL: (valueFromJS) => (valueFromJS ? 1 : 0),
  fromSQL: (valueFromSQL) => Boolean(valueFromSQL),
};

const _nullableBooleanColumn: NullableBooleanLikeColumn = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined
      ? null
      : valueFromJS
      ? 1
      : 0,
  fromSQL: (valueFromSQL) =>
    valueFromSQL === null ? null : Boolean(valueFromSQL),
};

const booleanIntColumn = () => _booleanColumn;
const booleanIntColumnNull = () => _nullableBooleanColumn;

export { booleanIntColumn, booleanIntColumnNull };
