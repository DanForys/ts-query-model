import {
  GenericConnection,
  QueryResultRow,
} from "../generic/generic-connection";
import { GenericQuery } from "../types/query-model";

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
}
