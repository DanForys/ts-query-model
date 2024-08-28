import SQL from "sql-template-strings";
import { columns, Database, SQLiteConnection } from "ts-query-model";

describe("ts-query-model SQLite support", () => {
  let db: Database<SQLiteConnection>;

  beforeAll(async () => {
    db = new Database(new SQLiteConnection(":memory:"));

    const createTable = db.write({
      name: "createTable",
      query: () => SQL`
        CREATE TABLE test (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          booleanLike INTEGER NOT NULL,
          number INTEGER NOT NULL
        );
      `,
    });

    await createTable();
  });

  afterAll(() => {
    db.disconnect();
  });

  it("can query a SQLite database for a single row", async () => {
    const getRow = db.getOne({
      name: "get-row-test",
      columns: {
        id: columns.numberColumnAutoIncrement(),
        name: columns.stringColumn(),
        booleanLike: columns.booleanIntColumn(),
        number: columns.numberColumn(),
      },
      query: () => ({
        sql: "SELECT * FROM test LIMIT 1",
      }),
    });

    const result = await getRow();
    expect(result?.id).toEqual(1);
  });

  it("can query a SQLite database for multiple rows", async () => {
    const getRows = db.getMany({
      name: "get-rows-test",
      columns: {
        id: columns.numberColumnAutoIncrement(),
        name: columns.stringColumn(),
        booleanLike: columns.booleanIntColumn(),
        number: columns.numberColumn(),
      },
      query: () => ({
        sql: "SELECT * FROM test",
      }),
    });

    const result = await getRows();
    expect(result.length).toEqual(3);
  });

  it("can query a SQLite database for a column", async () => {
    const getColumn = db.getColumn({
      name: "get-column-test",
      columnName: "name",
      columns: {
        name: columns.stringColumn(),
      },
      query: () => ({
        sql: "SELECT name FROM test",
      }),
    });

    const result = await getColumn();
    expect(result).toEqual(["Mr Flibble", "Lister", "Kryten"]);
  });

  it("can query a SQLite database for a single value", async () => {
    const getValue = db.getValue({
      name: "get-column-test",
      columnName: "rowCount",
      columns: {
        rowCount: columns.numberColumn(),
      },
      query: () => ({
        sql: "SELECT COUNT(*) AS rowCount FROM test",
      }),
    });

    const result = await getValue();
    expect(result).toEqual(3);
  });
});
