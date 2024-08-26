# ts-query-model

A simple TypeScript wrapper for database queries with some convenience features.
Not an ORM. Currently supports usage with the [mysql2 package](https://www.npmjs.com/package/mysql2).

## Features

- ✅ Pure SQL queries. No awkward JS/SQL mapping.
- ✅ Correctly typed query results without separate type declarations.
- ✅ Lightweight. No dependencies.
- ✅ No scripted setup process.
- ✅ Easily extensible with your own custom column types

## Installation

```bash
npm install ts-query-model
```

It is recommended to use in conjunction with
[sql-template-strings](https://www.npmjs.com/package/sql-template-strings)

```bash
npm install sql-template-strings
```

## Quick start

```typescript
import { columns, Database, MySQLConnection } from "ts-query-model";
import SQL from "sql-template-strings";

// Step 1: define your database connection
const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

// Step 2: create a query
const getUsers = db.getMany({
  name: "get-all-users", // optional query name for logging
  columns: {
    // define the columns to be returned
    id: columns.numberColumnAutoIncrement(),
    name: columns.stringColumn(),
    dateCreated: columns.dateColumn(),
    isBanned: columns.booleanIntColumn(),
  },
  query: ({ limit }: { limit: number }) =>
    // function to return the SQL to be executed
    SQL`SELECT id, name, dateCreated, isBanned FROM users LIMIT ${limit}`,
});

// Step 3: execute your query
const result = await getUsers({ limit: 10 });
//    ^ result is correctly     ^ query arguments are
//      typed according to        correctly typed
//      your columns
```
