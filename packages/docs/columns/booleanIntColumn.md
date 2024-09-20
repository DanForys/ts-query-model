---
outline: deep
---

# `booleanIntColumn()`

## When to use

- Your TypeScript code expects a `true` or `false` value
- The database column encodes this as a `1` or `0` integer value

## How it works

It transforms a JavaScript `true` or `false` value to an integer `1` or `0` respectively.
Used where the database does not support true Boolean columns e.g. MySQL.

The database column should be of type `TINYINT(1)`

## Nullability

If the column allows `null` values, use `booleanIntColumnNull()`.

## Example

Given the following database table `boolIntExample`:

| id `INT` | status `TINYINT(1)` |
| -------- | ------------------- |
| 1        | 0                   |
| 2        | 1                   |

And the following model:

```ts twoslash
import { columns, Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/lib/mysql";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

// ---cut---
const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    status: columns.booleanIntColumn(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT status FROM boolIntExample WHERE id = ${id}`,
});
```

A query for row id `1` yields:

```ts twoslash
import { columns, Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/lib/mysql";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    status: columns.booleanIntColumn(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT status FROM boolIntExample WHERE id = ${id}`,
});
// ---cut---
const result = await getExampleRow({ id: 1 });
if (result) {
  console.log(result.status);
  //                 ^?
}

// -> false
```

And for row `2`:

```ts twoslash
import { columns, Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/lib/mysql";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    status: columns.booleanIntColumn(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT status FROM boolIntExample WHERE id = ${id}`,
});
// ---cut---
const result = await getExampleRow({ id: 2 });

if (result) {
  console.log(result.status);
  //                 ^?
}

// -> true
```
