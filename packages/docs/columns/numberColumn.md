---
outline: deep
---

# `columns.numberColumn()`

## When to use

- Your TypeScript code expects a `number` value
- The database column is an integer or decimal value fitting into the range of a JS `number`

## How it works

It expects the underlying database driver to return a `number` for the column data.

## Nullability

If the column allows `null` values, use `numberNull()`.

If the column is an auto-increment primary key, use `numberAutoIncrement()`. This allows
`null` as an input, but will not be `null` on output.

## Example

Given the following database table `numberExample`:

| id `INT` | number `INT` |
| -------- | ------------ |
| 1        | 1234         |
| 2        | 5678         |

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
    number: columns.number(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT number FROM numberExample WHERE id = ${id}`,
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
    number: columns.number(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT number FROM numberExample WHERE id = ${id}`,
});
// ---cut---
const result = await getExampleRow({ id: 1 });
if (result) {
  console.log(result.number);
  //                 ^?
}

// -> 1234
```
