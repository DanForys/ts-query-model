---
outline: deep
---

# About

The `ts-query-model` package is a lightweight database query wrapper for MySQL.
Its API is designed for projects where:

- SQL is preferred over using an ORM
- Type inference is preferred over declaring types _and_ JavaScript object attributes

## Features

- ✅ Pure SQL queries. No awkward JS/SQL mapping.
- ✅ Correctly typed query results without separate type declarations.
- ✅ Lightweight. No dependencies.
- ✅ No scripted setup process.
- ✅ Easily extensible with your own custom column types

## Example syntax

### Defining a query

A query is given a name, an object of column names and types and a query function.
The query function is defined with typed parameters needed for the query.

When the query is executed, the returned result from the query function is passed
to the database engine.

```ts twoslash
import { columns, Database, MySQLConnection } from "ts-query-model";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

// ---cut---
const getUsers = db.getMany({
  name: "get-all-users",
  columns: {
    id: columns.numberColumnAutoIncrement(),
    name: columns.stringColumn(),
    dateCreated: columns.dateColumn(),
    isBanned: columns.booleanIntColumn(),
  },
  query: ({ limit }: { limit: number }) =>
    SQL`SELECT id, name, dateCreated, isBanned FROM users LIMIT ${limit}`,
});
```

### Executing a query

Using the configuration above, this will execute the query and return
a correctly typed result object from the `columns` configuration:

```ts twoslash
import { columns, Database, MySQLConnection } from "ts-query-model";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

const getUsers = db.getMany({
  name: "get-all-users",
  columns: {
    id: columns.numberColumnAutoIncrement(),
    name: columns.stringColumn(),
    dateCreated: columns.dateColumn(),
    isBanned: columns.booleanIntColumn(),
  },
  query: ({ limit }: { limit: number }) =>
    SQL`SELECT id, name, dateCreated, isBanned FROM users LIMIT ${limit}`,
});

// ---cut---
const result = await getUsers({ limit: 10 });
//    ^?
```
