import { ColumnDefinition } from "../../../types/query-model";

interface StringColumn extends ColumnDefinition {
  toSQL: (valueFromJS: string) => string;
  fromSQL: (valueFromSQL: string) => string;
}

interface StringColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: string | null | undefined) => string | null;
  fromSQL: (valueFromSQL: string | null) => string | null;
}

const _stringColumn: StringColumn = {
  toSQL: (valueFromJS) => valueFromJS.toString(),
  fromSQL: (valueFromSQL) => `${valueFromSQL}`,
  nullable: false,
};

const _nullableStringColumn: StringColumnNull = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined
      ? null
      : valueFromJS.toString(),
  fromSQL: (valueFromSQL) => (valueFromSQL === null ? null : `${valueFromSQL}`),
  nullable: true,
};

const stringColumn = () => _stringColumn;
const stringColumnNull = () => _nullableStringColumn;

export { stringColumn, stringColumnNull };
