import SQL from "sql-template-strings";
import { columns, Database } from "ts-query-model";
import SQLiteConnection from "ts-query-model/lib/sqlite";

describe("ts-query-model SQLite support", () => {
  let db: Database<SQLiteConnection>;

  beforeAll(async () => {
    db = new Database(new SQLiteConnection(":memory:"), {
      loggingEnabled: false,
    });

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

    const addRow = db.write({
      name: "addRow",
      query: (
        id: number,
        name: string,
        booleanLike: number,
        number: number
      ) => SQL`
        INSERT INTO test VALUES (
         ${id},
         ${name},
         ${booleanLike},
         ${number}
        )
      `,
    });

    await createTable();
    await addRow(1, "Mr Flibble", 1, 12345);
    await addRow(2, "Lister", 0, 6789);
    await addRow(3, "Kryten", 1, 101112);
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
      query: () => "SELECT * FROM test LIMIT 1",
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
      query: () => "SELECT * FROM test",
    });

    const result = await getRows();
    expect(result.length).toEqual(3);
  });

  it("can query a SQLite database for a column", async () => {
    const getColumn = db.getColumn({
      name: "get-column-test",
      columnName: "name",
      columnType: columns.stringColumn(),
      query: () => "SELECT name FROM test",
    });

    const result = await getColumn();
    expect(result).toEqual(["Mr Flibble", "Lister", "Kryten"]);
  });

  it("can query a SQLite database for a single value", async () => {
    const getValue = db.getValue({
      name: "get-column-test",
      columnName: "rowCount",
      columnType: columns.numberColumn(),
      query: () => "SELECT COUNT(*) AS rowCount FROM test",
    });

    const result = await getValue();
    expect(result).toEqual(3);
  });

  it("can insert a new row into a SQLite table", async () => {
    const insert = db.insert({
      name: "insert-test",
      table: "test",
      columns: {
        id: columns.numberColumnAutoIncrement(),
        name: columns.stringColumn(),
        booleanLike: columns.booleanIntColumn(),
        number: columns.numberColumn(),
      },
    });

    const result = await insert({
      id: null,
      name: "Mr Smoogle",
      booleanLike: true,
      number: 314,
    });

    expect(result.id).toBeGreaterThan(0);
  });
});
