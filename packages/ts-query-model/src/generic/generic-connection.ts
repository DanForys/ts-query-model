import { QueryColumns } from "../types/query-model";

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
  abstract insert(
    table: string,
    columns: QueryColumns,
    items: Record<string, unknown>
  ): Promise<unknown>;
}
