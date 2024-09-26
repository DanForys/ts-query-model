---
outline: deep
---

# Model API

All models are built from `Database` class instance factory methods. To get started,
get an instance configured for your database:

```ts twoslash
import { Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/mysql";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);
```

This `db` instance has some factory methods to create your models:

- `getOne()` - get a single row
- `getMany()` - get multiple rows
- `getColumn()` - get an array of values for a single column `columnName`
- `getValue()` - get a single value from `columnName`
- `write()` - execute a write query

## Creating a model

You can use these model factory methods in any way that makes sense to
your application.

A suggested pattern is to create and export an object of model methods.
For example, to create a model with some simple queries and an update
function for a `users` table:

```ts twoslash
import { db } from "./snippets/mysql-db";
// ---cut---
import { columns } from "ts-query-model";
import SQL from "sql-template-strings";

export const userModel = {
  getUserByName: db.getOne({
    name: "get-user-by-name",
    columns: {
      id: columns.number(),
      name: columns.string(),
      email: columns.stringNull(),
    },
    query: (name: string) => SQL`SELECT * FROM users WHERE name = ${name}`,
  }),
  getAllUsers: db.getMany({
    name: "get-all-users",
    columns: {
      id: columns.number(),
      name: columns.string(),
      email: columns.stringNull(),
    },
    query: (name: string) => SQL`SELECT * FROM users`,
  }),
  setUserEmailForUserId: db.write({
    name: "set-email-for-user-id",
    query: (userId: number, email: string) =>
      SQL`UPDATE users SET email = ${email} WHERE id = ${userId}`,
  }),
};
```

The model methods can then be used as follows:

```ts twoslash
import { Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/mysql";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);
import { columns } from "ts-query-model";
import SQL from "sql-template-strings";

export const userModel = {
  getUserByName: db.getOne({
    name: "get-user-by-name",
    columns: {
      id: columns.number(),
      name: columns.string(),
      email: columns.stringNull(),
    },
    query: (name: string) => SQL`SELECT * FROM users WHERE name = ${name}`,
  }),
  getAllUsers: db.getMany({
    name: "get-all-users",
    columns: {
      id: columns.number(),
      name: columns.string(),
      email: columns.stringNull(),
    },
    query: () => SQL`SELECT * FROM users`,
  }),
  setUserEmailForUserId: db.write({
    name: "set-email-for-user-id",
    query: (userId: number, email: string) =>
      SQL`UPDATE users SET email = ${email} WHERE id = ${userId}`,
  }),
};
// ---cut---
const oneUser = await userModel.getUserByName("Dan");
const allUsers = await userModel.getAllUsers();
const updateResult = await userModel.setUserEmailForUserId(32, "test@test.com");
```

Note that all the query function arguments and query result objects are
correctly typed.
