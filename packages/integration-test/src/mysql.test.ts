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

  beforeAll(() => {
    db = new Database(
      new MySQLConnection({
        uri: "mysql://query-test:query-test@localhost:3306/query-test",
      }),
      { loggingEnabled: false }
    );
  });

  afterAll(() => {
    db.disconnect();
  });

  it("can query a MySQL database for a single row", async () => {
    const getRow = db.getOne({
      name: "get-row-test",
      ...commonColumns("id", "name", "booleanLike", "number"),
      query: () => "SELECT * FROM test LIMIT 1",
    });

    const result = await getRow();
    expect(result?.id).toEqual(1);
  });

  it("can query a MySQL database for multiple rows", async () => {
    const getRows = db.getMany({
      name: "get-rows-test",
      ...commonColumns("id", "name", "booleanLike", "number"),
      query: () => "SELECT * FROM test",
    });

    const result = await getRows();
    expect(result.length).toEqual(3);
  });

  it("can query a MySQL database for a column", async () => {
    const getColumn = db.getColumn({
      name: "get-column-test",
      columnName: "name",
      ...commonColumns("name"),
      query: () => "SELECT name FROM test",
    });

    const result = await getColumn();
    expect(result).toEqual(["Mr Flibble", "Lister", "Kryten"]);
  });

  it("can query a MySQL database for a single value", async () => {
    const getValue = db.getValue({
      name: "get-column-test",
      columnName: "rowCount",
      ...commonColumns("rowCount"),
      query: () => "SELECT COUNT(*) AS rowCount FROM test",
    });

    const result = await getValue();
    expect(result).toEqual(3);
  });
});
