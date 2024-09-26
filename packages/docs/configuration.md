---
outline: deep
---

# Configuration

To configure a connection to the database, create an instance of the `Database` class.
You should export and re-use the database instance for each query you create.

## MySQL

For the full list of connection options, see the [node-mysql documentation](https://sidorares.github.io/node-mysql2/docs/examples/connections/create-connection#connectionoptions)

```ts
import { Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/mysql";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
    // Any other MySQL options go here. This is the options
    // block used by the mysql2 package directly
  })
);

export { db };
```

## PostgreSQL

For the full list of connection options, see the [pg documentation](https://node-postgres.com/features/connecting#programmatic)

```ts
import { Database, PostgreSQLConnection } from "ts-query-model";
import PostgreSQLConnection from "ts-query-model/postgres";

const db = new Database(
  new PostgreSQLConnection({
    user: "dbuser",
    password: "secretpassword",
    host: "database.server.com",
    port: 3211,
    database: "mydb",
    // Any other MySQL options go here. This is the options
    // block used by the mysql2 package directly
  })
);

export { db };
```

## SQLite

```ts
import { Database, SQLiteConnection } from "ts-query-model";
import SQLiteConnection from "ts-query-model/sqlite";

const db = new Database(new SQLiteConnection("database-filename"));

export { db };
```

## Basic usage

You can then use this `db` instance to create models:

```ts
import { db } from "./database";

const myModel = {
  getUsernameById: db.getOne({
    name: "get-username-by-id",
    columns: {
      name: columns.stringColumn(),
    },
    query: ({ id }: { id: number }) =>
      SQL`SELECT name FROM users WHERE id = ${id}`,
  }),
};
```

## Logging

Basic logging is built in using `console.info()`. It is enabled by default.
To disable logging, set `loggingEnabled: false` in the `Database` constructor options:

```ts
import { Database } from "ts-query-model";
import SQLiteConnection from "ts-query-model/sqlite";

const db = new Database(new SQLiteConnection("database-filename"), {
  loggingEnabled: false,
});
```
