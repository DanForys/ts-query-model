import { GenericConnection } from "../generic/generic-connection";
import {
  GenericQuery,
  GenericQueryFn,
  QueryOptions,
} from "../types/query-model";

import { QueryLogger } from "./database";

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
  readonly query?: Query;
  readonly connection: Connection;
  readonly logger: QueryLogger;

  /**
   * Constructor for QueryBuilder, contains the following keys:
   * @param modelOptions - `{ columns, getQuery(), updateQuery?() }`
   */
  constructor({
    name,
    columns,
    query,
    connection,
    logger,
  }: {
    name?: string;
    columns: Columns;
    query?: Query;
    connection: Connection;
    logger: QueryLogger;
  }) {
    this.name = name ?? "anonymous";
    this.columns = columns;
    this.query = query;
    this.connection = connection;
    this.logger = logger;
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

  startQueryLog() {
    return {
      startTime: new Date(),
    };
  }

  endQueryLog({ startTime }: { startTime: Date }, queryArgs: any[]) {
    if (!this.logger) return;

    this.logger.info(
      `Query "${this.name ?? "<Anonymous>"}" [${
        new Date().getMilliseconds() - startTime.getMilliseconds()
      }ms] args: ${queryArgs.length > 0 ? JSON.stringify(queryArgs) : "<none>"}`
    );
  }
}
