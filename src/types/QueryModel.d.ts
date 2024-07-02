import { GenericConnection } from "@/generic/generic-connection";
import { MySQLColumn } from "@/mysql/column-types";

export type GenericQueryFn = (...args: any[]) => any;

export interface QueryOptions {
  name?: string;
  columns: Record<string, MySQLColumn>;
  query: GenericQueryFn;
  connection: GenericConnection;
}

export type GenericConnectionInstance = InstanceType<
  new (...a: any[]) => GenericConnection
>;
