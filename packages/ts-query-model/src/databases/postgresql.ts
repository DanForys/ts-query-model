import {
  GenericConnection,
  QueryResultRow,
} from "../generic/generic-connection.js";
import { GenericQuery, QueryColumns } from "../types/query-model.js";

import pg from "pg";
const { Pool } = pg;

export class PostgreSQLConnection extends GenericConnection {
  options: pg.PoolConfig;
  pool: pg.Pool | null = null;

  constructor(options: pg.PoolConfig) {
    super();
    this.options = options;
  }

  getConnection() {
    if (this.pool) return this.pool;

    this.pool = new Pool(this.options);
    return this.pool;
  }

  disconnect() {
    return this.getConnection().end();
  }

  async getMany<T extends QueryResultRow>(query: GenericQuery): Promise<T[]> {
    const connection = this.getConnection();

    const result = await connection.query<T>(query);
    return result.rows;
  }

  async getOne<T extends QueryResultRow>(
    query: GenericQuery
  ): Promise<T | null> {
    const connection = this.getConnection();

    const result = await connection.query<T>(query);
    return result.rows[0] ?? null;
  }

  async write(query: GenericQuery): Promise<pg.QueryResult> {
    const connection = this.getConnection();

    const result = await connection.query(query);
    return result;
  }

  async insert(
    table: string,
    columns: QueryColumns,
    values: Record<string, unknown>
  ): Promise<typeof values> {
    const connection = this.getConnection();
    const columnNames = Object.keys(columns).filter(
      (name) => columns[name].autoIncrement !== true
    );
    const autoIncrementColumnName = Object.keys(columns).find(
      (name) => columns[name].autoIncrement
    );
    const valuesToInsert = { ...values };

    // Apply default values
    columnNames.map((name) => {
      if (
        columns[name].options &&
        "default" in columns[name].options &&
        values[name] === null
      ) {
        const defaultValue = columns[name].options.default;
        if (typeof defaultValue === "function") {
          valuesToInsert[name] = defaultValue();
        } else {
          valuesToInsert[name] = defaultValue;
        }
      }
    });

    const query = `
      insert into ${table} 
      (${columnNames.map((name) => `"${name}"`).join(",")})
      values (${columnNames.map((_, index) => `$${index + 1}`).join(",")})
      ${autoIncrementColumnName ? `returning "${autoIncrementColumnName}"` : ""}
    `;

    const result = await connection.query(
      query,
      columnNames.map((name) => columns[name].toSQL(valuesToInsert[name]))
    );

    // Apply auto-increment key if applicable
    const updatedRow = { ...valuesToInsert };

    if (autoIncrementColumnName) {
      updatedRow[autoIncrementColumnName] =
        result.rows[0][autoIncrementColumnName];
    }

    return updatedRow;
  }
}
