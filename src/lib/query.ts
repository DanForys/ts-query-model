import { GenericConnection } from "../generic/generic-connection";
import { GenericConnectionInstance, GenericQueryFn } from "../types/QueryModel";

import { AbstractModel } from "./abstract-model";

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class Query<
  Model extends typeof AbstractModel,
  Query extends GenericQueryFn
> {
  readonly name: string;
  readonly model: Model;
  readonly query: Query;
  readonly connection: GenericConnectionInstance;

  /**
   * Constructor for QueryBuilder, contains the following keys:
   * @param modelOptions - `{ columns, getQuery(), updateQuery?() }`
   */
  constructor({
    name,
    model,
    query,
    connection,
  }: {
    name?: string;
    model: Model;
    query: Query;
    connection: GenericConnection;
  }) {
    this.name = name ?? "anonymous";
    this.model = model;
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
