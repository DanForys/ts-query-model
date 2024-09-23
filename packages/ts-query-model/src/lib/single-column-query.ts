import { GenericConnection } from "../generic/generic-connection";
import { ColumnDefinition, GenericQueryFn } from "../types/query-model";

import { QueryLogger } from "./database";
import { Query } from "./query";

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class SingleColumnQuery<
  ColumnType extends ColumnDefinition,
  ColumnName extends string,
  Query extends GenericQueryFn,
  Connection extends GenericConnection
> extends Query<Connection> {
  query: GenericQueryFn;
  columnName: ColumnName;
  columnType: ColumnType;

  constructor({
    name,
    columnName,
    columnType,
    query,
    connection,
    logger,
  }: {
    name?: string;
    columnName: ColumnName;
    columnType: ColumnType;
    query: Query;
    connection: Connection;
    logger: QueryLogger;
  }) {
    super({ name, connection, logger });
    this.columnName = columnName;
    this.columnType = columnType;
    this.query = query;
  }

  validateFields(
    resultRow: Record<ColumnName, Parameters<ColumnType["fromSQL"]>[0]>
  ) {
    const resultKeys = Object.keys(resultRow);

    const missingColumnDefinitions = resultKeys.filter(
      (key) => key !== this.columnName
    );

    if (missingColumnDefinitions.length > 0) {
      throw new Error(
        `Field(s) [${missingColumnDefinitions.join(
          ", "
        )}] have not been defined `
      );
    }

    if (!(this.columnName in resultRow)) {
      throw new Error(
        `Expected field [${this.columnName}] was not returned from the query`
      );
    }
  }

  resultToObject(
    resultRow: Record<ColumnName, Parameters<ColumnType["fromSQL"]>[0]>
  ) {
    const mapped = Object.fromEntries(
      Object.entries(resultRow).map(([key, value]) => {
        if (value === null && !this.columnType.nullable)
          throw new Error(
            `Column "${key} is non-nullable, but a null value has been retrieved"`
          );
        return [key, this.columnType.fromSQL(value)];
      })
    );

    return mapped;
  }

  getColumn = () => {
    return async (
      ...args: Parameters<Query>
    ): Promise<ReturnType<ColumnType["fromSQL"]>[]> => {
      const query = this.query(...args);
      const logData = this.startQueryLog();

      try {
        const result = await this.connection.getMany<
          Record<ColumnName, ReturnType<ColumnDefinition["fromSQL"]>>
        >(query);

        if (result.length > 0) {
          this.validateFields(result[0]);
        }
        this.endQueryLog(logData, args);
        return result.map(
          (item: any) => this.resultToObject(item)[this.columnName]
        );
      } catch (e) {
        throw this.getQueryError(e, query);
      }
    };
  };

  getValue = () => {
    return async (
      ...args: Parameters<Query>
    ): Promise<ReturnType<ColumnType["fromSQL"]>> => {
      const query = this.query(...args);
      const logData = this.startQueryLog();

      try {
        const result = await this.connection.getMany<
          Record<ColumnName, ReturnType<ColumnDefinition["fromSQL"]>>
        >(query);

        if (result.length > 0) {
          this.validateFields(result[0]);
        }
        this.endQueryLog(logData, args);
        return this.resultToObject(result[0])[this.columnName];
      } catch (e) {
        throw this.getQueryError(e, query);
      }
    };
  };
}
