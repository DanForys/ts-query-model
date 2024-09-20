---
outline: deep
---

# `enumColumn()`

## When to use

- Your TypeScript code expects a string from a strictly defined set
- Your database column is an `ENUM` of defined values

## How it works

This column type is generic and takes a union of string values for the permitted `ENUM` values.
For example, if a column was defined with the possible enum values `CHEESE`, `WINE` and `JELLY`,
the column could be defined as:

```ts twoslash
import { columns } from "ts-query-model";
// ---cut---
columns.enumColumn<"CHEESE" | "WINE" | "JELLY">();
```

## Nullability

If the column allows `null` values, use `enumColumnNull()`.

## Example

Given the following database table `petExample`:

| id `INT` | pet `ENUM(CAT,DOG,FISH)` |
| -------- | ------------------------ |
| 1        | CAT                      |
| 2        | FISH                     |

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
    pet: columns.enumColumn<"CAT" | "DOG" | "FISH">(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT pet FROM petExample WHERE id = ${id}`,
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
    pet: columns.enumColumn<"CAT" | "DOG" | "FISH">(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT pet FROM petExample WHERE id = ${id}`,
});
// ---cut---
const result = await getExampleRow({ id: 1 });
if (result) {
  console.log(result.pet);
  //                 ^?
}

// -> 'CAT'
```
