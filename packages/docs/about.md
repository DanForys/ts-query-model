---
outline: deep
---

# About

The `ts-query-model` package is a lightweight database query wrapper for MySQL, PostgreSQL and SQLite.
It aims to provide a middle ground between the complexity of using an ORM
and having to manually create types for raw SQL queries.

Its API is designed for projects where:

- SQL is preferred over using an ORM
- Type inference is preferred over declaring types _and_ JavaScript object attributes

## Features

- ✅ Pure SQL queries. No query builder syntax.
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
import { db, SQL, columns } from "./snippets/mysql-db";
// ---cut---
const getUsers = db.getMany({
  name: "get-all-users",
  columns: {
    id: columns.numberAutoIncrement(),
    name: columns.string(),
    dateCreated: columns.date(),
    isBanned: columns.booleanInt(),
  },
  query: ({ limit }: { limit: number }) =>
    SQL`SELECT id, name, dateCreated, isBanned FROM users LIMIT ${limit}`,
});
```

### Executing a query

Using the configuration above, this will execute the query and return
a correctly typed result object from the `columns` configuration:

```ts twoslash
// @noErrors
// ^ allow top-level await
import { db, SQL, columns } from "./snippets/mysql-db";

const getUsers = db.getMany({
  name: "get-all-users",
  columns: {
    id: columns.numberAutoIncrement(),
    name: columns.string(),
    dateCreated: columns.date(),
    isBanned: columns.booleanInt(),
  },
  query: ({ limit }: { limit: number }) =>
    SQL`SELECT id, name, dateCreated, isBanned FROM users LIMIT ${limit}`,
});

// ---cut---
const result = await getUsers({ limit: 10 });
//    ^?
```
