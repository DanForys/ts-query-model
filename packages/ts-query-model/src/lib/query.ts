import { GenericConnection } from "../generic/generic-connection";
import {
  GenericQuery,
  GenericQueryFn,
  QueryOptions,
} from "../types/query-model";

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class Query<
  Columns extends QueryOptions["columns"],
  Query extends GenericQueryFn,
  Connection extends GenericConnection
> {
  readonly name: string;
  readonly columns: Columns;
  readonly query: Query;
  readonly connection: Connection;

  /**
   * Constructor for QueryBuilder, contains the following keys:
   * @param modelOptions - `{ columns, getQuery(), updateQuery?() }`
   */
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
    this.name = name ?? "anonymous";
    this.columns = columns;
    this.query = query;
    this.connection = connection;
  }

  getQueryError(e: any, query: GenericQuery) {
    const stringifiedQuery =
      typeof query === "string" ? query : JSON.stringify(query);

    if (e instanceof Error) {
      return new Error(
        `Query "${
          this.name
        }" failed with "${e.toString()}": ${stringifiedQuery}`
      );
    }

    return e;
  }
}
