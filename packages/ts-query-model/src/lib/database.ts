import { GenericConnection } from "../generic/generic-connection";
import {
  ColumnDefinition,
  GenericQueryFn,
  QueryColumns,
} from "../types/query-model";

import { InsertQuery } from "./insert-query";
import { ReadQuery } from "./read-query";
import { SingleColumnQuery } from "./single-column-query";
import { WriteQuery } from "./write-query";

interface GetQueryOptions<T extends QueryColumns, Q extends GenericQueryFn> {
  /**
   * [optional] query name for logging
   */
  name?: string;
  /**
   * Column definition object
   */
  columns: T;
  /**
   * Query function
   */
  query: Q;
}

interface GetColumnQueryOptions<
  T extends ColumnDefinition,
  N extends string,
  Q extends GenericQueryFn
> {
  /**
   * Name of the column to return
   */
  name?: string;
  columnName: N;
  columnType: T;
  query: Q;
}

interface WriteQueryOptions<Q extends GenericQueryFn> {
  /**
   * [optional] query name for logging
   */
  name?: string;
  /**
   * Query function
   */
  query: Q;
}

interface InsertQueryOptions<T extends QueryColumns> {
  name?: string;
  table: string;
  columns: T;
}

export interface QueryModelDatabaseOptions {
  loggingEnabled: boolean;
}

// To be expanded in the future
export type QueryLogger = typeof console | null;

export class Database<Connection extends GenericConnection> {
  connection: Connection;
  logger: QueryLogger | null;
  options: QueryModelDatabaseOptions;

  constructor(connection: Connection, options?: QueryModelDatabaseOptions) {
    this.connection = connection;

    this.options = {
      loggingEnabled: options?.loggingEnabled ?? true,
    };

    this.logger = this.options.loggingEnabled ? console : null;
  }

  disconnect() {
    this.connection.disconnect();
  }

  /**
   * Create a query for a single row:
   * @param name - Query name for logging
   * @param columns - Column definition
   * @param query - function returning the query to be run
   */
  getOne<Query extends GenericQueryFn, Columns extends QueryColumns>({
    name,
    columns,
    query,
  }: GetQueryOptions<Columns, Query>): ReadQuery<
    Columns,
    Query,
    Connection
  >["getOne"] {
    return new ReadQuery({
      connection: this.connection,
      name,
      columns,
      query,
      logger: this.logger,
    }).getOne;
  }

  getMany<Query extends GenericQueryFn, Columns extends QueryColumns>({
    name,
    columns,
    query,
  }: GetQueryOptions<Columns, Query>): ReadQuery<
    Columns,
    Query,
    Connection
  >["getMany"] {
    return new ReadQuery({
      connection: this.connection,
      name,
      columns,
      query,
      logger: this.logger,
    }).getMany;
  }

  /**
   * Get an array of values from a single column
   */
  getColumn<
    Column extends ColumnDefinition,
    Query extends GenericQueryFn,
    ColumnName extends string
  >({
    name,
    columnName,
    columnType,
    query,
  }: GetColumnQueryOptions<Column, ColumnName, Query>): ReturnType<
    SingleColumnQuery<Column, ColumnName, Query, Connection>["getColumn"]
  > {
    return new SingleColumnQuery({
      connection: this.connection,
      name,
      columnName,
      columnType,
      query,
      logger: this.logger,
    }).getColumn();
  }

  /**
   * Get a single value from a single column
   */
  getValue<
    Column extends ColumnDefinition,
    Query extends GenericQueryFn,
    ColumnName extends string
  >({
    name,
    columnName,
    columnType,
    query,
  }: GetColumnQueryOptions<Column, ColumnName, Query>): ReturnType<
    SingleColumnQuery<Column, ColumnName, Query, Connection>["getValue"]
  > {
    return new SingleColumnQuery({
      connection: this.connection,
      name,
      columnName,
      columnType,
      query,
      logger: this.logger,
    }).getValue();
  }

  /**
   * Create a row in the database
   */
  write<Query extends GenericQueryFn, Columns extends QueryColumns>({
    name,
    query,
  }: WriteQueryOptions<Query>): WriteQuery<
    Columns,
    Query,
    Connection
  >["write"] {
    return new WriteQuery({
      connection: this.connection,
      name,
      columns: {},
      query,
      logger: this.logger,
    }).write;
  }

  insert<Columns extends QueryColumns>({
    name,
    table,
    columns,
  }: InsertQueryOptions<Columns>) {
    return new InsertQuery({
      connection: this.connection,
      name,
      table,
      columns,
      logger: this.logger,
    }).insert;
  }
}
