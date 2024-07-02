import { GenericConnection } from "../generic/generic-connection";
import { GenericQueryFn, QueryOptions } from "../types/QueryModel";

import { ReadQuery } from "./read-query";

export class Database {
  connection: GenericConnection;

  constructor(connection: GenericConnection) {
    this.connection = connection;
  }

  getOne<
    Query extends GenericQueryFn,
    Columns extends QueryOptions["columns"]
  >({
    name,
    columns,
    query,
  }: {
    name?: string;
    columns: Columns;
    query: Query;
  }): ReadQuery<Columns, Query>["getOne"] {
    return new ReadQuery({ connection: this.connection, name, columns, query })
      .getOne;
  }

  getMany<
    Query extends GenericQueryFn,
    Columns extends QueryOptions["columns"]
  >({
    name,
    columns,
    query,
  }: {
    name?: string;
    columns: Columns;
    query: Query;
  }): ReadQuery<Columns, Query>["getMany"] {
    return new ReadQuery({ connection: this.connection, name, columns, query })
      .getMany;
  }
}
