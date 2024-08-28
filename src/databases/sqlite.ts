import { GenericConnection } from "../generic/generic-connection";

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

  async getMany<T>(
    ...query: Parameters<sqlite3.Database["all"]>
  ): Promise<T[]> {
    const connmection = await this.getConnection();

    return new Promise((resolve, reject) => {
      connmection.all(query[0], query[1] ?? [], (error, rows) => {
        if (error) return reject(error);
        resolve(rows as T[]);
      });
    });
  }

  async getOne<T>(...query: Parameters<sqlite3.Database["get"]>): Promise<T> {
    const connmection = await this.getConnection();

    return new Promise((resolve, reject) => {
      connmection.get(query[0], query[1] ?? [], (error, row) => {
        if (error) return reject(error);
        resolve(row as T);
      });
    });
  }

  async write(
    ...query: Parameters<sqlite3.Database["get"]>
  ): Promise<{ lastID: number; changes: number }> {
    const connmection = await this.getConnection();

    return new Promise((resolve, reject) => {
      connmection.run(query[0], query[1] ?? [], function (error) {
        if (error) return reject(error);
        resolve({
          lastID: this.lastID,
          changes: this.changes,
        });
      });
    });
  }
}
