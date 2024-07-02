import {
  GenericConnectionInstance,
  GenericQueryFn,
  QueryOptions,
} from "../types/QueryModel";

import { Query } from "./query";

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class ReadQuery<
  Columns extends QueryOptions["columns"],
  Query extends GenericQueryFn
> extends Query<Columns, Query> {
  constructor({
    name,
    columns,
    query,
    connection,
  }: {
    name?: string;
    columns: Columns;
    query: Query;
    connection: GenericConnectionInstance;
  }) {
    super({ name, columns, query, connection });
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

  resultToObject<K extends keyof Columns>(resultRow: Record<K, unknown>) {
    const mapped = Object.fromEntries(
      Object.entries(resultRow).map(([key, value]) => [
        key,
        this.columns[key].get(value),
      ])
    );

    return mapped as {
      [Property in keyof Columns]: ReturnType<Columns[Property]["get"]>;
    };
  }

  getOne = async (...args: Parameters<Query>) => {
    const query = this.query(...args);

    try {
      const result = await this.connection.getOne<
        Record<keyof Columns, unknown>
      >(query);

      if (!result) return null;
      this.validateFields(result);
      return this.resultToObject(result);
    } catch (e) {
      throw this.getQueryError(e, query);
    }
  };

  getMany = async (...args: Parameters<Query>) => {
    const query = this.query(...args);

    try {
      const result = await this.connection.getMany<
        Record<keyof Columns, unknown>
      >(query);

      if (result.length > 0) {
        this.validateFields(result[0]);
      }

      return result.map((item: any) => this.resultToObject(item)) as {
        [Property in keyof Columns]: ReturnType<Columns[Property]["get"]>;
      }[];
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
