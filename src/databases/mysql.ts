import { GenericConnection } from "../generic/generic-connection";

import mysql, {
  Connection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

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

  async getMany<T>(...query: Parameters<Connection["query"]>): Promise<T[]> {
    const connection = this.getConnection();
    const result = await connection.execute<T[] & RowDataPacket[]>(...query);
    return result[0];
  }

  async getOne<T>(
    ...query: Parameters<Connection["query"]>
  ): Promise<T | null> {
    const connection = this.getConnection();
    const result = await connection.execute<T[] & RowDataPacket[]>(...query);

    return result[0][0] ?? null;
  }

  async write(
    ...query: Parameters<Connection["query"]>
  ): Promise<ResultSetHeader> {
    const connection = this.getConnection();
    const result = await connection.execute<ResultSetHeader>(...query);

    return result[0];
  }
}
