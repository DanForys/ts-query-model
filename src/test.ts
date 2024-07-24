import { Database } from "./lib/database";
import columnTypes from "./mysql/column-types";
// import { QueryOptions } from "./types/QueryModel";
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

class UserModel extends db.buildModel({
  departure_date: columnTypes.STRING(),
  origin: columnTypes.STRING(),
  destination: columnTypes.STRING(),
}) {
  // departure_date = "";
  // origin = "";
  // destination = "";
}
// const UserModel = db.buildModel({
//   departure_date: columnTypes.STRING(),
//   origin: columnTypes.STRING(),
//   destination: columnTypes.STRING(),
// })

const userModel = {
  getUser: db.getOne({
    name: "getUser",
    model: UserModel,
    query: (origin: string, destination: string) => ({
      sql: `
        SELECT departure_date, origin, destination FROM train_demand
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

const user = new UserModel();

user.departure_date;
user.data?.departure_date;

console.log(typeof user, user instanceof UserModel);
console.log({ ...user });
console.log(user.getColumns());

const yy = (thing: UserModel) => {
  console.log(thing);
};
