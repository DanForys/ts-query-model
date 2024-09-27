import { GenericConnection } from "../generic/generic-connection.js";

interface TemplateStringQuery {
  text: string;
  sql: string;
  values?: any | any[] | { [param: string]: any };
}

export type GenericQuery = TemplateStringQuery | string;

export type GenericQueryFn = (...args: any[]) => GenericQuery;

export type QueryColumns = Record<string, ColumnDefinition>;

export interface QueryOptions {
  name?: string;
  columns: QueryColumns;
  query: GenericQueryFn;
  connection: GenericConnection;
}

export type GenericConnectionInstance = InstanceType<
  new (...a: any[]) => GenericConnection
>;

export type ColumnDefault<DefaultType> = DefaultType | (() => DefaultType);

export type ColumnOptions<DefaultType> = {
  default?: ColumnDefault<DefaultType>;
};

export interface ColumnDefinition {
  toSQL: (valueFromJS: any) => any;
  fromSQL: (valueFromSQL: any) => any;
  create: () => any;
  nullable: boolean;
  autoIncrement?: boolean;
  options?: ColumnOptions<unknown>;
}

export type ExtractRowType<T extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<T>> extends unknown[]
    ? Awaited<ReturnType<T>>[number]
    : Awaited<ReturnType<T>>;

export type DatabaseRow<Columns extends QueryColumns> = {
  [Property in keyof Columns]: ReturnType<Columns[Property]["fromSQL"]>;
};

export type DatabaseColumn<
  ColumnName extends string,
  ColumnType extends ColumnDefinition
> = Record<ColumnName, ReturnType<ColumnType["fromSQL"]>>;
