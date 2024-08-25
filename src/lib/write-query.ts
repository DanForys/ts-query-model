import { GenericConnection } from "../generic/generic-connection";
import { GenericQueryFn, QueryColumns } from "../types/query-model";

import { Query } from "./query";

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
> extends Query<Columns, Query, Connection> {
  constructor({
    name,
    columns,
    query,
    connection,
  }: {
    name?: string;
    columns: Columns;
    query: Query;
    connection: Connection;
  }) {
    super({ name, columns, query, connection });
  }

  write = async (
    ...args: Parameters<Query>
  ): Promise<ReturnType<Connection["write"]>> => {
    const query = this.query(...args);

    try {
      const result = await this.connection.write(query);
      return result as ReturnType<Connection["write"]>;
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
