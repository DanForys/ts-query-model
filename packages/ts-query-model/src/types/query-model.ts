import { GenericConnection } from "../generic/generic-connection";

interface TemplateStringQuery {
  text: string;
  sql: string;
  values?: any[];
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

export interface ColumnDefinition {
  toSQL: (valueFromJS: any) => any;
  fromSQL: (valueFromSQL: any) => any;
}

export type ExtractRowType<T extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<T>>;
