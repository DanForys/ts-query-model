import { GenericConnection } from "../generic/generic-connection.js";
import { GenericQueryFn, QueryColumns } from "../types/query-model.js";

import { QueryLogger } from "./database.js";
import { Query } from "./query.js";

type WriteQueryResult<Connection extends GenericConnection> = Awaited<
  ReturnType<Connection["write"]>
>;

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class WriteQuery<
  Columns extends QueryColumns,
  Query extends GenericQueryFn,
  Connection extends GenericConnection
> extends Query<Connection> {
  query: GenericQueryFn;
  columns: Columns;

  constructor({
    name,
    columns,
    query,
    connection,
    logger,
  }: {
    name?: string;
    columns: Columns;
    query: Query;
    connection: Connection;
    logger: QueryLogger;
  }) {
    super({ name, connection, logger });
    this.columns = columns;
    this.query = query;
  }

  write = async (
    ...args: Parameters<Query>
  ): Promise<WriteQueryResult<Connection>> => {
    if (!this.query) throw new Error("Query must be defined");

    const query = this.query(...args);
    const logData = this.startQueryLog();

    try {
      const result = await this.connection.write(query);
      this.endQueryLog(logData, args);
      return result as WriteQueryResult<Connection>;
    } catch (e) {
      throw this.getQueryError(e, query);
    }
  };

  // async update(row: {
  //   [Property in keyof T]: ReturnType<T[Property]["get"]>;
  // }) {
  //   if (!this.updateQueryFn) throw new Error("No update query defined");

  //   const transformed = Object.fromEntries(
  //     Object.entries(row).map(([key, value]) => [
  //       key,
  //       this.columnTypes[key].set(value),
  //     ])
  //   ) as {
  //     [Property in keyof T]: ReturnType<T[Property]["get"]>;
  //   };

  //   return this.updateQueryFn(transformed);
  // }
}
