export abstract class GenericConnection {
  abstract getConnection(): unknown;
  abstract disconnect(): void;
  abstract getOne<T>(...query: unknown[]): Promise<T | null>;
  abstract getMany<T>(...query: unknown[]): Promise<T[]>;
  abstract write(...query: unknown[]): Promise<unknown>;
}
