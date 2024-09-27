import { ColumnDefinition, ColumnOptions } from "../../../types/query-model";
import { getDefaultOrFallback } from "../get-default-or-fallback";

export interface EnumColumn<EnumShape extends string> extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape) => EnumShape;
  fromSQL: (valueFromSQL: EnumShape) => EnumShape;
  create: () => EnumShape;
}

export interface EnumColumnNull<EnumShape extends string>
  extends ColumnDefinition {
  toSQL: (valueFromJS: EnumShape | null | undefined) => EnumShape | null;
  fromSQL: (valueFromSQL: EnumShape | null) => EnumShape | null;
  create: () => EnumShape;
}

const enumColumn = <EnumShape extends string>(
  options?: ColumnOptions<EnumShape>
): EnumColumn<EnumShape> => {
  return {
    toSQL: (valueFromJS: EnumShape) => valueFromJS,
    fromSQL: (valueFromSQL: EnumShape) => valueFromSQL,
    create: () => getDefaultOrFallback(options?.default),
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
    create: () => getDefaultOrFallback(options?.default, null),
    nullable: true,
    options,
  };
};

export { enumColumn, enumColumnNull };
