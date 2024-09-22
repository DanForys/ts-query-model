import { ColumnDefinition } from "../../../types/query-model";

interface DateColumn extends ColumnDefinition {
  toSQL: (valueFromJS: Date) => Date;
  fromSQL: (valueFromSQL: Date) => Date;
}

interface DateColumnNull extends ColumnDefinition {
  toSQL: (valueFromJS: Date | null | undefined) => Date | null;
  fromSQL: (valueFromSQL: Date | null) => Date | null;
}

const _dateColumn: DateColumn = {
  toSQL: (valueFromJS) => valueFromJS,
  fromSQL: (valueFromSQL) => valueFromSQL,
  nullable: false,
};

const _nullableDateColumn: DateColumnNull = {
  toSQL: (valueFromJS) =>
    valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
  fromSQL: (valueFromSQL) => (valueFromSQL === null ? null : valueFromSQL),
  nullable: true,
};

const dateColumn = () => _dateColumn;
const dateColumnNull = () => _nullableDateColumn;

export { dateColumn, dateColumnNull };
