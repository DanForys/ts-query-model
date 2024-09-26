import { DummySQLConnection } from "../databases/dummy.js";

import { columns } from "./columns/index.js";
import { Database } from "./database.js";

describe("The Database class", () => {
  it("can be instantiated", () => {
    const dbInstance = new Database(new DummySQLConnection());
    expect(() =>
      dbInstance.getMany({
        columns: { test: columns.string() },
        query: (input: string) => ({
          sql: `DUMMY SQL`,
          text: `DUMMY SQL`,
          values: [input],
        }),
      })
    ).not.toThrow();
  });
});
