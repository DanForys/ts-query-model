export interface QueryResultRow {
  [column: string]: any;
}

export abstract class GenericConnection {
  abstract getConnection(): unknown;
  abstract disconnect(): void;
  abstract getOne<T extends QueryResultRow>(
    ...query: unknown[]
  ): Promise<T | null>;
  abstract getMany<T extends QueryResultRow>(...query: unknown[]): Promise<T[]>;
  abstract write(...query: unknown[]): Promise<unknown>;
}
