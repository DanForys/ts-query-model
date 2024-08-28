import { GenericConnection } from "../generic/generic-connection";

import mysql, {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import { GenericQuery } from "../types/query-model";

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

  async getMany<T>(query: GenericQuery): Promise<T[]> {
    const connection = this.getConnection();

    if (typeof query === "string") {
      const result = await connection.execute<T[] & RowDataPacket[]>(query);
      return result[0];
    }

    const result = await connection.execute<T[] & RowDataPacket[]>(query);
    return result[0];
  }

  async getOne<T>(
    query: GenericQuery
  ): Promise<T | null> {
    const connection = this.getConnection();

    if (typeof query === 'string') {
      const result = await connection.execute<T[] & RowDataPacket[]>(query);
      return result[0][0] ?? null;
    }

    const result = await connection.execute<T[] & RowDataPacket[]>(query);
    return result[0][0] ?? null;
  }

  async write(
    query: GenericQuery
  ): Promise<ResultSetHeader> {
    const connection = this.getConnection();

    if (typeof query === "string") {
      const result = await connection.execute<ResultSetHeader>(query);
      return result[0];
    }
    
    const result = await connection.execute<ResultSetHeader>(query);
    return result[0];
  }
}
