import { DummySQLConnection } from "./databases/dummy";
import { enumColumn } from "./lib/columns/column-types/enum-column";
import { jsonColumn } from "./lib/columns/column-types/json-like-column";
import {
  nullableStringColumn,
  stringColumn,
} from "./lib/columns/column-types/string-like-column";
import { Database } from "./lib/database";
import { ExtractRowType } from "./types/query-model";

const db = new Database(new DummySQLConnection());

const userModel = {
  getUser: db.getMany({
    columns: {
      departure_date: stringColumn(),
      origin: stringColumn(),
      destination: nullableStringColumn(),
      things: enumColumn<"one" | "two">(),
      blob: jsonColumn<{ hello: boolean }>(),
    },
    query: (origin: string, destination: string) => ({
      sql: `
        SELECT departure_date, origin, destination, total_availability FROM train_demand
        WHERE origin = ?
        AND destination = ?
      `,
      values: [origin, destination],
    }),
  }),
  getUserColumn: db.getColumn({
    columnName: "blob",
    columns: {
      departure_date: stringColumn(),
      origin: stringColumn(),
      destination: nullableStringColumn(),
      things: enumColumn<"one" | "two">(),
      blob: jsonColumn<{ hello: boolean }>(),
    },
    query: (origin: string, destination: string) => ({
      sql: `
        SELECT departure_date, origin, destination, total_availability FROM train_demand
        WHERE origin = ?
        AND destination = ?
      `,
      values: [origin, destination],
    }),
  }),
  createUser: db.write({
    name: "createUser",
    query: (user: UserModelRow) => ({
      sql: `
        INSERT INTO users SET name = ?
      `,
      values: { ...user },
    }),
  }),
};

type UserModelRow = ExtractRowType<typeof userModel.getUser>[number];

const log = (row: UserModelRow) => {
  console.log(row);
};

const run = async () => {
  const t = await userModel.getUser("8814001", "8775100");
  console.log(t);
  log(t[0]);
  if (t) {
    // const yy = t.things;
    // const pp = t.departure_date;
    // const qq = t.destination;
    // const ll = t.blob.hello;
  }

  // const r = await userModel.createUser({
  //   departure_date: "hello",
  //   destination: "cheese",
  //   origin: "foo",
  //   blob: { hello: true },
  //   things: "two",
  // });
};

run().then(() => console.log("FIN"));
