import { GenericConnection } from "../generic/generic-connection";

export type GenericQueryFn = (...args: any[]) => any;

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
