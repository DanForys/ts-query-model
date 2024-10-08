import SQL from "sql-template-strings";
import { columns, Database } from "ts-query-model";
import PostgreSQLConnection from "ts-query-model/postgres";

describe("ts-query-model PostgreSQL support", () => {
  let db: Database<PostgreSQLConnection>;

  beforeAll(async () => {
    db = new Database(
      new PostgreSQLConnection({
        host: "localhost",
        user: "query-test",
        password: "query-test",
        database: "query-test",
      }),
      { loggingEnabled: false }
    );

    const createTable = db.write({
      name: "createTable",
      query: () => SQL`
        CREATE TABLE test (
          id serial primary key,
          name TEXT NOT NULL,
          booleanlike INTEGER NOT NULL,
          number INTEGER NOT NULL
        );
      `,
    });

    const addRow = db.write({
      name: "addRow",
      query: (name: string, booleanlike: number, number: number) => SQL`
        INSERT INTO test ("name", "booleanlike", "number") VALUES (
         ${name},
         ${booleanlike},
         ${number}
        )
      `,
    });

    await createTable();
    await addRow("Mr Flibble", 1, 12345);
    await addRow("Lister", 0, 6789);
    await addRow("Kryten", 1, 101112);
  });

  afterAll(async () => {
    const destroyTable = db.write({
      name: "destroyTable",
      query: () => SQL`
        DROP TABLE test
      `,
    });

    await destroyTable();

    db.disconnect();
  });

  it("can query a PostgreSQL database for a single row", async () => {
    const getRow = db.getOne({
      name: "get-row-test",
      columns: {
        id: columns.numberAutoIncrement(),
        name: columns.string(),
        booleanlike: columns.booleanInt(),
        number: columns.number(),
      },
      query: () => "SELECT * FROM test LIMIT 1",
    });

    const result = await getRow();
    expect(result?.id).toEqual(1);
  });

  it("can query a PostgreSQL database for multiple rows", async () => {
    const getRows = db.getMany({
      name: "get-rows-test",
      columns: {
        id: columns.numberAutoIncrement(),
        name: columns.string(),
        booleanlike: columns.booleanInt(),
        number: columns.number(),
      },
      query: () => "SELECT * FROM test",
    });

    const result = await getRows();
    expect(result.length).toEqual(3);
  });

  it("can query a PostgreSQL database for a column", async () => {
    const getColumn = db.getColumn({
      name: "get-column-test",
      columnName: "name",
      columnType: columns.string(),
      query: () => "SELECT name FROM test",
    });

    const result = await getColumn();
    expect(result).toEqual(["Mr Flibble", "Lister", "Kryten"]);
  });

  it("can query a PostgreSQL database for a single value", async () => {
    const getValue = db.getValue({
      name: "get-column-test",
      columnName: "rowcount",
      columnType: columns.number(),
      query: () => "SELECT COUNT(*) AS rowcount FROM test",
    });

    const result = await getValue();
    expect(result).toEqual("3"); // PG sends this as a bigint, which is a string from pg.js
  });

  it("can insert a new row into a PostgreSQL table", async () => {
    const insert = db.insert({
      name: "insert-test",
      table: "test",
      columns: {
        id: columns.numberAutoIncrement(),
        name: columns.string(),
        booleanlike: columns.booleanInt(),
        number: columns.number(),
      },
    });

    const result = await insert({
      id: null,
      name: "Mr Smoogle",
      booleanlike: true,
      number: 314,
    });

    expect(result.id).toBeGreaterThan(0);
  });

  it("can insert a new row with default values into a PostgreSQL table", async () => {
    const insert = db.insert({
      name: "insert-test",
      table: "test",
      columns: {
        id: columns.numberAutoIncrement(),
        name: columns.stringNull({ default: "Mr Anonymous" }),
        booleanlike: columns.booleanInt(),
        number: columns.number(),
      },
    });

    const result = await insert({
      id: null,
      name: null,
      booleanlike: true,
      number: 314,
    });

    expect(result.id).toBeGreaterThan(0);
    expect(result.name).toEqual("Mr Anonymous");
  });

  it("can insert a new row with default values from a function into a PostgreSQL table", async () => {
    const insert = db.insert({
      name: "insert-test",
      table: "test",
      columns: {
        id: columns.numberAutoIncrement(),
        name: columns.stringNull({ default: () => "Cat" }),
        booleanlike: columns.booleanInt(),
        number: columns.number(),
      },
    });

    const result = await insert({
      id: null,
      name: null,
      booleanlike: true,
      number: 314,
    });

    expect(result.id).toBeGreaterThan(0);
    expect(result.name).toEqual("Cat");
  });
});
