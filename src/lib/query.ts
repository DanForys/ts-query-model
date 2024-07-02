import { GenericConnection } from "../generic/generic-connection";
import {
  GenericConnectionInstance,
  GenericQueryFn,
  QueryOptions,
} from "../types/QueryModel";

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class Query<
  Columns extends QueryOptions["columns"],
  Query extends GenericQueryFn
> {
  readonly name: string;
  readonly columns: Columns;
  readonly query: Query;
  readonly connection: GenericConnectionInstance;

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
    connection: GenericConnection;
  }) {
    this.name = name ?? "anonymous";
    this.columns = columns;
    this.query = query;
    this.connection = connection;
  }

  getQueryError(e: any, query: string | Record<string, unknown>) {
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
