import { GenericConnection } from "../generic/generic-connection";

import mysql, {
  Connection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

export class MySQLConnection extends GenericConnection {
  options: mysql.ConnectionOptions;
  connection: mysql.Connection | null = null;

  constructor(options: mysql.ConnectionOptions) {
    super();
    this.options = options;
  }

  async getConnection() {
    if (this.connection) return this.connection;

    this.connection = await mysql.createConnection(this.options);

    // FIXME
    // this.connection.on("end", () => {
    //   this.connection = null;
    // });

    return this.connection;
  }

  async getMany<T>(...query: Parameters<Connection["query"]>): Promise<T[]> {
    const connection = await this.getConnection();
    const result = await connection.query<T[] & RowDataPacket[]>(...query);
    return result[0];
  }

  async getOne<T>(
    ...query: Parameters<Connection["query"]>
  ): Promise<T | null> {
    const connection = await this.getConnection();
    const result = await connection.query<T[] & RowDataPacket[]>(...query);

    return result[0][0] ?? null;
  }

  async write(
    ...query: Parameters<Connection["query"]>
  ): Promise<ResultSetHeader> {
    const connection = await this.getConnection();
    const result = await connection.query<ResultSetHeader>(...query);

    return result[0];
  }
}
