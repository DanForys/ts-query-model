import {
  GenericConnection,
  QueryResultRow,
} from "../generic/generic-connection.js";
import { GenericQuery, QueryColumns } from "../types/query-model.js";

import sqlite3 from "sqlite3";

export class SQLiteConnection extends GenericConnection {
  filename: string;
  mode?: number;
  connection: sqlite3.Database | null;

  constructor(filename: string, mode?: number) {
    super();
    this.filename = filename;
    this.mode = mode;
    this.connection = null;
  }

  getConnection(): Promise<sqlite3.Database> {
    if (this.connection) return Promise.resolve(this.connection);

    if (this.mode) {
      return new Promise<sqlite3.Database>((resolve, reject) => {
        const connection = new sqlite3.Database(
          this.filename,
          this.mode,
          (error) => {
            if (error) return reject(error);
            this.connection = connection;
            resolve(connection);
          }
        );
      });
    }

    return new Promise<sqlite3.Database>((resolve, reject) => {
      const connection = new sqlite3.Database(this.filename, (error) => {
        if (error) return reject(error);
        this.connection = connection;
        resolve(connection);
      });
    });
  }

  async disconnect() {
    const connection = await this.getConnection();
    return connection.close();
  }

  async getMany<T extends QueryResultRow>(query: GenericQuery): Promise<T[]> {
    const connection = await this.getConnection();

    if (typeof query === "string") {
      return new Promise((resolve, reject) => {
        connection.all(query, (error, rows) => {
          if (error) return reject(error);
          resolve(rows as T[]);
        });
      });
    }

    return new Promise((resolve, reject) => {
      connection.all(query.sql, query.values ?? [], (error, rows) => {
        if (error) return reject(error);
        resolve(rows as T[]);
      });
    });
  }

  async getOne<T extends QueryResultRow>(
    query: GenericQuery
  ): Promise<T | null> {
    const connection = await this.getConnection();

    if (typeof query === "string") {
      return new Promise((resolve, reject) => {
        connection.get(query, (error, row: T) => {
          if (error) return reject(error);
          resolve(row);
        });
      });
    }

    return new Promise((resolve, reject) => {
      connection.get(query.sql, query.values ?? [], (error, row: T) => {
        if (error) return reject(error);
        resolve(row);
      });
    });
  }

  async write(
    query: GenericQuery
  ): Promise<{ lastID: number; changes: number }> {
    const connection = await this.getConnection();

    if (typeof query === "string") {
      return new Promise((resolve, reject) => {
        connection.run(query, function (error) {
          if (error) return reject(error);
          resolve({
            lastID: this.lastID,
            changes: this.changes,
          });
        });
      });
    }

    return new Promise((resolve, reject) => {
      connection.run(query.sql, query.values ?? [], function (error) {
        if (error) return reject(error);
        resolve({
          lastID: this.lastID,
          changes: this.changes,
        });
      });
    });
  }

  async insert(
    table: string,
    columns: QueryColumns,
    values: Record<string, unknown>
  ): Promise<typeof values> {
    const connection = await this.getConnection();

    return new Promise((resolve, reject) => {
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

      const query = `
        INSERT INTO \`${table}\` 
        (${columnNames.join(",")})
        VALUES (${columnNames.map(() => "?").join(",")})
      `;

      connection.run(
        query,
        columnNames.map((name) => valuesToInsert[name]),
        function (error) {
          if (error) return reject(error);

          const updatedRow = { ...valuesToInsert };

          // Apply auto-increment key if applicable
          if (this.lastID) {
            const autoIncrementColumnName = columnNames.find(
              (col) => columns[col].autoIncrement
            );

            if (autoIncrementColumnName) {
              updatedRow[autoIncrementColumnName] = this.lastID;
            }
          }

          resolve(updatedRow);
        }
      );
    });
  }
}
