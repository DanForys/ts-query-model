export abstract class GenericConnection {
  abstract getConnection(): unknown;
  abstract getOne<T>(...query: unknown[]): Promise<T | null>;
  abstract getMany<T>(...query: unknown[]): Promise<T[]>;
}
