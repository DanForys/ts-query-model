# ts-query-model

A simple TypeScript wrapper for database queries with some convenience features.
Not an ORM. Currently supports MySQL, PostgreSQL and SQLite.

It aims to provide a middle ground between the complexity of using an ORM
and having to manually create types for raw SQL queries.

➡️➡️ [Full API documentation](https://ts-query-model.forys.uk/) ⬅️⬅️

## Features

- ✅ Write SQL. No querybuilder API.
- ✅ Correctly typed query results without separate type declarations.
- ✅ Lightweight. No dependencies.
- ✅ No scripted setup process.
- ✅ Easily extensible with your own custom column types.

## Installation

```bash
npm install ts-query-model
```

To use with MySQL, use the `mysql2` package:

```bash
npm install mysql2
```

To use with PostgreSQL, use the `pg` package:

```bash
npm install pg
```

To use with SQLite, use the `sqlite3` package:

```bash
npm install sqlite3
```

It is recommended to use in conjunction with
[sql-template-strings](https://www.npmjs.com/package/sql-template-strings)

```bash
npm install sql-template-strings
```

## Code example (MySQL)

```typescript
import { columns, Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/lib/mysql";
import SQL from "sql-template-strings";

// Step 1: define your database connection
// (Also supports SQLite and PostgreSQL)
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

See more at the [full API documentation](https://ts-query-model.forys.uk/)
