import { GenericConnection } from "../generic/generic-connection";

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

export type ColumnOptions = {
  default?: string | number | Date | boolean | null | (() => any);
};

export interface ColumnDefinition {
  toSQL: (valueFromJS: any) => any;
  fromSQL: (valueFromSQL: any) => any;
  nullable: boolean;
  autoIncrement?: boolean;
  options?: ColumnOptions;
}

export type ExtractRowType<T extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<T>> extends unknown[]
    ? Awaited<ReturnType<T>>[number]
    : Awaited<ReturnType<T>>;
