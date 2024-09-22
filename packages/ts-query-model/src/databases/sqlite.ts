import {
  GenericConnection,
  QueryResultRow,
} from "../generic/generic-connection";
import { GenericQuery, QueryColumns } from "../types/query-model";

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
  ): Promise<unknown> {
    // const connection = this.getConnection();

    // const queryInsertPairs = Object.keys(columns).map((name) => {
    //   return `${name} = ?`;
    // });

    // const query = `INSERT INTO \`${table}\` SET ${queryInsertPairs.join(",")}`;

    // const result = await connection.query<ResultSetHeader>(query, values);
    // return result[0];
    console.log(table, columns, values);
    return;
  }
}
