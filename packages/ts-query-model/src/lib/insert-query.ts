import { GenericConnection } from "../generic/generic-connection";
import { DatabaseRow, QueryColumns } from "../types/query-model";

import { QueryLogger } from "./database";
import { Query } from "./query";

type InsertDatabaseRow<Columns extends QueryColumns> = {
  [Property in keyof Columns]: Parameters<Columns[Property]["toSQL"]>[0];
};

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class InsertQuery<
  Columns extends QueryColumns,
  Connection extends GenericConnection
> extends Query<Connection> {
  table: string;
  columns: Columns;

  constructor({
    name,
    table,
    columns,
    connection,
    logger,
  }: {
    name?: string;
    table: string;
    columns: Columns;
    connection: Connection;
    logger: QueryLogger;
  }) {
    super({ name, connection, logger });
    this.table = table;
    this.columns = columns;
  }

  insert = async (items: InsertDatabaseRow<Columns>) => {
    const logData = this.startQueryLog();

    try {
      const result = await this.connection.insert(
        this.table,
        this.columns,
        items
      );
      this.endQueryLog(logData, Object.entries(items));
      return result as DatabaseRow<Columns>;
    } catch (e) {
      // FIXME
      // throw this.getQueryError(e, query);
      console.log(e);
      throw e;
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
