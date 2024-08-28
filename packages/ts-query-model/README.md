# ts-query-model

A simple TypeScript wrapper for database queries with some convenience features.
Not an ORM. Currently supports MySQL and SQLite.

It aims to provide a middle ground between the complexity of using an ORM
and having to manually create types for raw SQL queries.

➡️➡️ [Full documentation website](https://ts-query-model.forys.uk/) ⬅️⬅️

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

To use with MySQL, use the `mysql2` package:

```bash
npm install mysql2
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

## Quick start (MySQL)

```typescript
import { columns, Database, MySQLConnection } from "ts-query-model";
import SQL from "sql-template-strings";

// Step 1: define your database connection
// (You can use new SQLiteConnection() for SQLite)
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

See more at the [full documentation website](https://ts-query-model.forys.uk/)

## Database methods

### `getOne({ name?, columns, query })`

Create a query function to run `query` and return a single row of columns.

### `getMany({ name?, columns, query })`

Create a query function to run `query` and return multiple rows of columns.

### `getColumn({ name?, columnName, columns, query })`

Create a query function to run `query` and return an array of results
only from column `columnName`.

### `getValue({ name?, columnName, columns, query })`

Create a query function to run `query` and return a single value
only from column `columnName`.

### `write({ name?, query })`

Create a query function to write to the database, returning a result set header.

## Column types

| Column function                   | TypeScript type                          | Database type                             |
| --------------------------------- | ---------------------------------------- | ----------------------------------------- |
| `booleanIntColumn`                | `boolean`                                | `0` &#124; `1`                            |
| `booleanIntColumnNull`            | `boolean` &#124; `null`                  | `0` &#124; `1` &#124; `null`              |
| `dateColumn`                      | `Date`                                   | `DateTime`                                |
| `dateColumnNull`                  | `Date` &#124; `null`                     | `DateTime` &#124; `null`                  |
| `enumColumn<EnumShape>`           | `EnumShape extends string`               | `ENUM`                                    |
| `enumColumnNull<EnumShape>`       | `EnumShape extends string` #124; `null`  | `ENUM` &#124; `null`                      |
| `jsonStringColumn<JsonShape>`     | `JsonShape extends object`               | `TEXT` &#124; `VARCHAR` etc               |
| `jsonStringColumnNull<JsonShape>` | `JsonShape extends object` &#124; `null` | `TEXT` &#124; `VARCHAR` etc &#124; `null` |
| `numberColumn`                    | `number`                                 | `INT`, `MEDIUMINT` etc                    |
| `numberColumnAutoIncrement`       | `number` &#124; `null`                   | `INT`, `MEDIUMINT` etc                    |
| `numberColumnNull`                | `number` &#124; `null`                   | `INT`, `MEDIUMINT` etc &#124; `null`      |
| `stringColumn`                    | `string`                                 | `TEXT` &#124; `VARCHAR` etc               |
| `stringColumnNull`                | `string` &#124; `null`                   | `TEXT` &#124; `VARCHAR` etc &#124; `null` |
