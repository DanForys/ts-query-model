import { GenericConnection } from "../generic/generic-connection";

export class DummySQLConnection extends GenericConnection {
  constructor() {
    super();
  }

  async getConnection() {
    return {};
  }

  async getMany<T>(): Promise<T[]> {
    return [];
  }

  async getOne<T>(): Promise<T | null> {
    return null;
  }

  async write(): Promise<null> {
    return null;
  }
}
