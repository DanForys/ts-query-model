import { Database } from "./lib/database";
import columnTypes from "./mysql/column-types";
import { MySQLConnection } from "./mysql";

type ModelRow<T extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<T>
>;

const db = new Database(
  new MySQLConnection({
    uri: "mysql://packages_demand:packages_demand@localhost:3306",
    database: "packages_demand",
  })
);

const userModel = {
  getUser: db.getMany({
    columns: {
      departure_date: columnTypes.STRING(),
      origin: columnTypes.STRING(),
      destination: columnTypes.STRING(),
      // things: columnTypes.ENUM<["one", "two"]>(),
      // blob: columnTypes.JSONSTRING<{ hello: boolean }>(),
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
};

type UserModelRow = ModelRow<typeof userModel.getUser>;

const log = (row: UserModelRow) => {
  console.log(row);
};

const run = async () => {
  const t = await userModel.getUser("8814001", "8775100");
  console.log(t);
  log(t);
};

run().then(() => console.log("FIN"));
