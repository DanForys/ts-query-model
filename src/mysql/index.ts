import { GenericConnection } from "@/generic/generic-connection";

import mysql, { Connection, RowDataPacket } from "mysql2/promise";

export class MySQLConnection extends GenericConnection {
  connectionUri: string;
  connection: mysql.Connection | null = null;

  constructor({ uri }: { uri: string }) {
    super();
    this.connectionUri = uri;
  }

  async getConnection() {
    if (this.connection) return this.connection;

    this.connection = await mysql.createConnection({
      uri: this.connectionUri,
    });

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
}
