import { GenericConnectionInstance, GenericQueryFn } from "../types/QueryModel";

import { AbstractModel } from "./abstract-model";
import { Query } from "./query";

// type ModelInstance<Model extends AbstractModel> = InstanceType<Model>;

// type Columns<M extends Model> = ReturnType<ModelInstance<M>["getColumns"]>;

/**
 * QueryBuilder Class
 * @typeParam T extends QueryModelColumnsDefinition - The column definitions passed to the constructor
 * @typeParam QueryFunc - The read-query function
 * @typeParam UpdateFunc - The write-query function
 * @param <H> - Headers
 */
export class ReadQuery<
  Model extends typeof AbstractModel,
  Query extends GenericQueryFn
> extends Query<Model, Query> {
  constructor({
    name,
    model,
    query,
    connection,
  }: {
    name?: string;
    model: Model;
    query: Query;
    connection: GenericConnectionInstance;
  }) {
    super({ name, model, query, connection });
  }

  validateFields<K extends keyof InstanceType<Model>["columns"]>(
    modelInstance: InstanceType<Model>,
    resultRow: Record<K, unknown>
  ) {
    const resultKeys = Object.keys(resultRow);

    const missingColumnDefinitions = resultKeys.filter(
      (key) => !(key in modelInstance.columns)
    );

    const missingRowColumns = Object.keys(modelInstance.columns).filter(
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

  resultToModel<K extends keyof InstanceType<Model>["columns"]>(
    resultRow: Record<K, unknown>
  ): InstanceType<Model> {
    const model = new this.model();

    for (const key in resultRow) {
      if (model.data && key in model.data) {
        model.data[key] = model.columns[key].get(resultRow[key]);
      }
    }

    return model;
  }

  getOne = async (
    ...args: Parameters<Query>
  ): Promise<InstanceType<Model> | null> => {
    const query = this.query(...args);

    try {
      const result = await this.connection.getOne<
        Record<keyof InstanceType<Model>["columns"], unknown>
      >(query);

      if (!result) return null;
      // this.validateFields(result);
      return this.resultToModel(result);
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

      return result.map((item: any) => this.resultToModel(item)) as {
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
