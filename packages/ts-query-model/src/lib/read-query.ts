import { GenericConnection } from "../generic/generic-connection.js";
import {
  DatabaseRow,
  GenericQueryFn,
  QueryColumns,
} from "../types/query-model.js";

import { QueryLogger } from "./database.js";
import { Query } from "./query.js";

type QueryFunctionArgs<Query extends GenericQueryFn> = Parameters<Query>;

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class ReadQuery<
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

  validateFields<K extends keyof Columns>(resultRow: Record<K, unknown>) {
    const resultKeys = Object.keys(resultRow);

    const missingColumnDefinitions = resultKeys.filter(
      (key) => !(key in this.columns)
    );

    const missingRowColumns = Object.keys(this.columns).filter(
      (key) => !(key in resultRow)
    );

    if (missingColumnDefinitions.length > 0) {
      throw new Error(
        `Field(s) [${missingColumnDefinitions.join(
          ", "
        )}] have not been defined `
      );
    }

    if (missingRowColumns.length > 0) {
      throw new Error(
        `Expected field(s) [${missingRowColumns.join(
          ", "
        )}] were not returned from the query`
      );
    }
  }

  resultToObject<K extends keyof Columns>(
    resultRow: Record<K, unknown>
  ): DatabaseRow<Columns> {
    const mapped = Object.fromEntries(
      Object.entries(resultRow).map(([key, value]) => {
        if (value === null && !this.columns[key].nullable)
          throw new Error(
            `Column "${key} is non-nullable, but a null value has been retrieved"`
          );
        return [key, this.columns[key].fromSQL(value)];
      })
    );

    return mapped as DatabaseRow<Columns>;
  }

  getOne = async (...args: Parameters<Query>) => {
    const query = this.query(...args);
    const logData = this.startQueryLog();

    try {
      const result = await this.connection.getOne<
        Record<keyof Columns, unknown>
      >(query);

      if (!result) return null;
      this.validateFields(result);
      this.endQueryLog(logData, args);

      return this.resultToObject(result);
    } catch (e) {
      throw this.getQueryError(e, query);
    }
  };

  getMany = async (...args: QueryFunctionArgs<Query>) => {
    const query = this.query(...args);
    const logData = this.startQueryLog();

    try {
      const result = await this.connection.getMany<
        Record<keyof Columns, unknown>
      >(query);

      if (result.length > 0) {
        this.validateFields(result[0]);
      }

      this.endQueryLog(logData, args);
      return result.map((item: any) => this.resultToObject(item));
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
