import SQL from "sql-template-strings";
import { buildColumnSet, columns, Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/lib/mysql";

describe("ts-query-model", () => {
  let db: Database<MySQLConnection>;
  const commonColumns = buildColumnSet({
    id: columns.numberColumnAutoIncrement(),
    name: columns.stringColumn(),
    booleanLike: columns.booleanIntColumn(),
    number: columns.numberColumn(),
    rowCount: columns.numberColumn(),
  });

  beforeAll(async () => {
    db = new Database(
      new MySQLConnection({
        uri: "mysql://query-test:query-test@localhost:3306/query-test",
      }),
      { loggingEnabled: false }
    );

    const dropTable = db.write({
      name: "createTable",
      query: () => `
        DROP TABLE IF EXISTS test;
      `,
    });

    const createTable = db.write({
      name: "createTable",
      query: () => `
        CREATE TABLE test (
          id int unsigned NOT NULL AUTO_INCREMENT,
          name varchar(30) DEFAULT NULL,
          booleanLike tinyint(1) DEFAULT NULL,
          number int DEFAULT NULL,
          PRIMARY KEY (id)
        );
      `,
    });

    const addRow = db.write({
      name: "addRow",
      query: (
        id: number,
        name: string,
        booleanlike: number,
        number: number
      ) => SQL`
        INSERT INTO test VALUES (
         ${id},
         ${name},
         ${booleanlike},
         ${number}
        )
      `,
    });

    await dropTable();
    await createTable();
    await addRow(1, "Mr Flibble", 1, 12345);
    await addRow(2, "Lister", 0, 6789);
    await addRow(3, "Kryten", 1, 101112);
  });

  afterAll(() => {
    db.disconnect();
  });

  it("can query a MySQL database for a single row", async () => {
    const getRow = db.getOne({
      name: "get-row-test",
      columns: commonColumns.get("id", "name", "booleanLike", "number"),
      query: () => "SELECT * FROM test LIMIT 1",
    });

    const result = await getRow();
    expect(result?.id).toEqual(1);
  });

  it("can query a MySQL database for multiple rows", async () => {
    const getRows = db.getMany({
      name: "get-rows-test",
      columns: commonColumns.get("id", "name", "booleanLike", "number"),
      query: () => "SELECT * FROM test",
    });

    const result = await getRows();
    expect(result.length).toEqual(3);
  });

  it("can query a MySQL database for a column", async () => {
    const getColumn = db.getColumn({
      name: "get-column-test",
      columnName: "name",
      columnType: columns.stringColumn(),
      query: () => "SELECT name FROM test",
    });

    const result = await getColumn();
    expect(result).toEqual(["Mr Flibble", "Lister", "Kryten"]);
  });

  it("can query a MySQL database for a single value", async () => {
    const getValue = db.getValue({
      name: "get-column-test",
      columnName: "rowCount",
      columnType: columns.numberColumn(),
      query: () => "SELECT COUNT(*) AS rowCount FROM test",
    });

    const result = await getValue();
    expect(result).toEqual(3);
  });

  it("can insert a new row into a MySQL table", async () => {
    const insert = db.insert({
      name: "insert-test",
      table: "test",
      columns: commonColumns.get("id", "name", "booleanLike", "number"),
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
