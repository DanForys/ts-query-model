import { GenericConnection } from "@/generic/generic-connection";

import { MySQLColumn } from "../mysql/column-types";

import { QueryOptions } from "mysql2";

export type QueryLike = QueryOptions;

type QueryModelColumnsDefinition = Record<string, MySQLColumn>;

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class QueryModel<
  T extends QueryModelColumnsDefinition,
  QueryFunc extends (...args: any[]) => any,
  UpdateFunc extends (updateProps: {
    [Property in keyof T]: ReturnType<T[Property]["get"]>;
  }) => any
> {
  readonly columnTypes: T;
  getQueryFn: QueryFunc;
  updateQueryFn?: UpdateFunc;
  static dbConnection: GenericConnection;

  /**
   * Constructor for QueryBuilder, contains the following keys:
   * @param modelOptions - `{ columns, getQuery(), updateQuery?() }`
   */
  constructor({
    columns,
    getQuery,
    updateQuery,
  }: {
    columns: T;
    getQuery: QueryFunc;
    updateQuery?: UpdateFunc;
  }) {
    this.columnTypes = columns;
    this.getQueryFn = getQuery;
    this.updateQueryFn = updateQuery;
  }

  static setConnection(connection: GenericConnection) {
    QueryModel.dbConnection = connection;
  }

  getField<K extends keyof T>(key: K, value: unknown): ReturnType<T[K]["get"]> {
    return this.columnTypes[key].get(value) as ReturnType<T[K]["get"]>;
  }

  setField<K extends keyof T>(key: K, value: unknown): ReturnType<T[K]["set"]> {
    return this.columnTypes[key].set(value) as ReturnType<T[K]["set"]>;
  }

  resultToObject<K extends keyof T>(resultRows: Record<K, unknown>) {
    const mapped = Object.entries(resultRows).map(([key, value]) => [
      key,
      this.columnTypes[key].get(value),
    ]);

    return mapped as { [Property in keyof T]: ReturnType<T[Property]["get"]> };
  }

  async getOne(...args: Parameters<QueryFunc>) {
    const result = await QueryModel.dbConnection.getOne<
      Record<keyof T, unknown>
    >(this.getQueryFn(...args));

    if (!result) return null;
    return this.resultToObject(result);
  }

  /**
   * Returns the average of two numbers.
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The arithmetic mean of `x` and `y`
   *
   * @beta
   */
  async getMany(...args: Parameters<QueryFunc>) {
    const result = await QueryModel.dbConnection.getMany<
      Record<keyof T, unknown>
    >(this.getQueryFn(...args));

    return result.map(this.resultToObject);
  }

  async update(row: {
    [Property in keyof T]: ReturnType<T[Property]["get"]>;
  }) {
    if (!this.updateQueryFn) throw new Error("No update query defined");

    const transformed = Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        this.columnTypes[key].set(value),
      ])
    ) as {
      [Property in keyof T]: ReturnType<T[Property]["get"]>;
    };

    return this.updateQueryFn(transformed);
  }
}
