import {
  GenericConnection,
  QueryResultRow,
} from "../generic/generic-connection.js";
import { GenericQuery, QueryColumns } from "../types/query-model.js";

import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class MySQLConnection extends GenericConnection {
  options: mysql.ConnectionOptions;
  pool: mysql.Pool | null = null;

  constructor(options: mysql.ConnectionOptions) {
    super();
    this.options = options;
  }

  getConnection() {
    if (this.pool) return this.pool;

    this.pool = mysql.createPool(this.options);
    return this.pool;
  }

  disconnect() {
    this.getConnection().end();
  }

  async getMany<T extends QueryResultRow>(query: GenericQuery): Promise<T[]> {
    const connection = this.getConnection();

    if (typeof query === "string") {
      const result = await connection.query<T[] & RowDataPacket[]>(query);
      return result[0];
    }

    const result = await connection.query<T[] & RowDataPacket[]>(query);
    return result[0];
  }

  async getOne<T extends QueryResultRow>(
    query: GenericQuery
  ): Promise<T | null> {
    const connection = this.getConnection();

    if (typeof query === "string") {
      const result = await connection.query<T[] & RowDataPacket[]>(query);
      return result[0][0] ?? null;
    }

    const result = await connection.query<T[] & RowDataPacket[]>(query);
    return result[0][0] ?? null;
  }

  async write(query: GenericQuery): Promise<ResultSetHeader> {
    const connection = this.getConnection();

    if (typeof query === "string") {
      const result = await connection.query<ResultSetHeader>(query);
      return result[0];
    }

    const result = await connection.query<ResultSetHeader>(query);
    return result[0];
  }

  async insert(
    table: string,
    columns: QueryColumns,
    values: Record<string, unknown>
  ): Promise<typeof values> {
    const connection = this.getConnection();
    const columnNames = Object.keys(columns);
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

    // Perform query
    const queryInsertPairs = columnNames.map((name) => {
      return `\`${name}\` = ?`;
    });

    const query = `INSERT INTO \`${table}\` SET ${queryInsertPairs.join(",")}`;

    const result = await connection.query<ResultSetHeader>(
      query,
      columnNames.map((name) => valuesToInsert[name])
    );

    // Apply auto-increment key if applicable
    const updatedRow = { ...valuesToInsert };

    if (result[0].insertId) {
      const autoIncrementColumnName = columnNames.find(
        (col) => columns[col].autoIncrement
      );

      if (autoIncrementColumnName) {
        updatedRow[autoIncrementColumnName] = result[0].insertId;
      }
    }

    return updatedRow;
  }
}
