import { GenericConnection } from "../generic/generic-connection";
import { GenericQueryFn, ModelColumnsDefinition } from "../types/QueryModel";

import { AbstractModel } from "./abstract-model";
import { ReadQuery } from "./read-query";

export class Database {
  connection: GenericConnection;

  constructor(connection: GenericConnection) {
    this.connection = connection;
  }

  buildModel<Columns extends ModelColumnsDefinition>(columns: Columns) {
    const model = class extends AbstractModel {
      columns: Columns;
      data:
        | {
            [Property in keyof Columns]: ReturnType<Columns[Property]["get"]>;
          }
        | null;
      constructor() {
        super();
        this.columns = columns;
        this.data = null;
      }
      getColumns(): Columns {
        return this.columns;
      }
    };

    return model;
  }

  getOne<Query extends GenericQueryFn, Model extends typeof AbstractModel>({
    name,
    model,
    query,
  }: {
    name?: string;
    model: Model;
    query: Query;
  }): ReadQuery<Model, Query>["getOne"] {
    return new ReadQuery({
      connection: this.connection,
      name,
      model,
      query,
    }).getOne;
  }

  getMany<Query extends GenericQueryFn, Model extends typeof AbstractModel>({
    name,
    model,
    query,
  }: {
    name?: string;
    model: Model;
    query: Query;
  }): ReadQuery<Model, Query>["getMany"] {
    return new ReadQuery({ connection: this.connection, name, model, query })
      .getMany;
  }
}
