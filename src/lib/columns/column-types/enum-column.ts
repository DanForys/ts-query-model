import { ColumnDefinition } from "../../../types/query-model";

interface EnumColumn<EnumShape extends string> extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape) => EnumShape;
  fromSQL: (valueFromSQL: EnumShape) => EnumShape;
}

interface NullableEnumColumn<EnumShape extends string>
  extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape | null | undefined) => EnumShape | null;
  fromSQL: (valueFromSQL: EnumShape | null) => EnumShape | null;
}

const enumColumn = <EnumShape extends string>() => {
  return {
    toSQL: (valueFromJS: EnumShape) => valueFromJS,
    fromSQL: (valueFromSQL: EnumShape) => valueFromSQL,
  } as EnumColumn<EnumShape>;
};

const nullableEnumColumn = <EnumShape extends string>() => {
  return {
    toSQL: (valueFromJS: EnumShape | null) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL: EnumShape | null) => valueFromSQL,
  } as NullableEnumColumn<EnumShape>;
};

export { enumColumn, nullableEnumColumn };
