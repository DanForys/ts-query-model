import { ColumnDefinition } from "../../../types/query-model";

interface EnumColumn<EnumShape extends string> extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape) => EnumShape;
  fromSQL: (valueFromSQL: EnumShape) => EnumShape;
}

interface EnumColumnNull<EnumShape extends string> extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape | null | undefined) => EnumShape | null;
  fromSQL: (valueFromSQL: EnumShape | null) => EnumShape | null;
}

const enumColumn = <EnumShape extends string>(): EnumColumn<EnumShape> => {
  return {
    toSQL: (valueFromJS: EnumShape) => valueFromJS,
    fromSQL: (valueFromSQL: EnumShape) => valueFromSQL,
  };
};

const enumColumnNull = <
  EnumShape extends string
>(): EnumColumnNull<EnumShape> => {
  return {
    toSQL: (valueFromJS: EnumShape | null | undefined) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL: EnumShape | null) => valueFromSQL,
  };
};

export { enumColumn, enumColumnNull };
