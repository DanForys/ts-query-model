import { columns, Database, MySQLConnection } from "ts-query-model";

describe("ts-query-model", () => {
  it("can query a MYSQL database", async () => {
    const db = new Database(
      new MySQLConnection({
        uri: "mysql://query-test:query-test@localhost:3306/query-test",
      })
    );

    const model = {
      getRow: db.getOne({
        name: "Get a row",
        columns: {
          id: columns.autoIncrementNumberColumn(),
          name: columns.stringColumn(),
          booleanLike: columns.booleanColumn(),
          number: columns.numberColumn(),
        },
        query: () => ({
          sql: "SELECT * FROM test LIMIT 1",
        }),
      }),
    };

    const result = await model.getRow();
    expect(result?.id).toEqual(1);
    db.disconnect();
  });
});
