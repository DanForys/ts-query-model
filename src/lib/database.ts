import { GenericConnection } from "../generic/generic-connection";
import { GenericQueryFn, QueryColumns } from "../types/query-model";

import { ReadQuery } from "./read-query";
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
  T extends QueryColumns,
  Q extends GenericQueryFn
> extends GetQueryOptions<T, Q> {
  /**
   * Name of the column to return
   */
  columnName: string;
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

export class Database<Connection extends GenericConnection> {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getOne<Query extends GenericQueryFn, Columns extends QueryColumns>({
    name,
    columns,
    query,
  }: GetQueryOptions<Columns, Query>): ReadQuery<
    Columns,
    Query,
    Connection
  >["getOne"] {
    return new ReadQuery({ connection: this.connection, name, columns, query })
      .getOne;
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
    return new ReadQuery({ connection: this.connection, name, columns, query })
      .getMany;
  }

  /**
   * Get an array of values from a single column
   */
  getColumn<Query extends GenericQueryFn, Columns extends QueryColumns>({
    name,
    columnName,
    columns,
    query,
  }: GetColumnQueryOptions<Columns, Query>): ReturnType<
    ReadQuery<Columns, Query, Connection>["getColumn"]
  > {
    return new ReadQuery({
      connection: this.connection,
      name,
      columns,
      query,
    }).getColumn(columnName);
  }

  /**
   * Get a single value from a single column
   */
  getValue<Query extends GenericQueryFn, Columns extends QueryColumns>({
    name,
    columnName,
    columns,
    query,
  }: GetColumnQueryOptions<Columns, Query>): ReturnType<
    ReadQuery<Columns, Query, Connection>["getValue"]
  > {
    return new ReadQuery({
      connection: this.connection,
      name,
      columns,
      query,
    }).getValue(columnName);
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
    }).write;
  }
}
