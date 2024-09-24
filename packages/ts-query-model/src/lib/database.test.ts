import { DummySQLConnection } from "../databases/dummy";

import { columns } from "./columns";
import { Database } from "./database";

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
