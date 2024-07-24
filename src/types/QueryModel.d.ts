import { GenericConnection } from "@/generic/generic-connection";

export type GenericQueryFn = (...args: any[]) => any;

export type BuiltColumn = {
  get: (value: unknown) => unknown;
  set: (value: unknown) => unknown;
};

export type ModelColumnsDefinition =
  | Record<string, BuiltColumn>
  | Record<string, never>;

export interface QueryOptions {
  name?: string;
  columns: ModelColumnsDefinition;
  query: GenericQueryFn;
  connection: GenericConnection;
}

export type GenericConnectionInstance = InstanceType<
  new (...a: any[]) => GenericConnection
>;
