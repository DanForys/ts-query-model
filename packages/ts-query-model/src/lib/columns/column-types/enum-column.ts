import { ColumnDefinition, ColumnOptions } from "../../../types/query-model.js";

export interface EnumColumn<EnumShape extends string> extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape) => EnumShape;
  fromSQL: (valueFromSQL: EnumShape) => EnumShape;
}

export interface EnumColumnNull<EnumShape extends string>
  extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape | null | undefined) => EnumShape | null;
  fromSQL: (valueFromSQL: EnumShape | null) => EnumShape | null;
}

const enumColumn = <EnumShape extends string>(
  options?: ColumnOptions<EnumShape>
): EnumColumn<EnumShape> => {
  return {
    toSQL: (valueFromJS: EnumShape) => valueFromJS,
    fromSQL: (valueFromSQL: EnumShape) => valueFromSQL,
    nullable: false,
    options,
  };
};

const enumColumnNull = <EnumShape extends string>(
  options?: ColumnOptions<EnumShape>
): EnumColumnNull<EnumShape> => {
  return {
    toSQL: (valueFromJS: EnumShape | null | undefined) =>
      valueFromJS === null || valueFromJS === undefined ? null : valueFromJS,
    fromSQL: (valueFromSQL: EnumShape | null) => valueFromSQL,
    nullable: true,
    options,
  };
};

export { enumColumn, enumColumnNull };
