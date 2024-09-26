---
outline: deep
---

# `columns.booleanInt()`

## When to use

- Your TypeScript code expects a `true` or `false` value
- The database column encodes this as a `1` or `0` integer value

## How it works

It transforms a JavaScript `true` or `false` value to an integer `1` or `0` respectively.
Used where the database does not support true Boolean columns e.g. MySQL.

The database column should be of type `TINYINT(1)`

## Nullability

If the column allows `null` values, use `columns.booleanIntNull()`.

## Example

Given the following database table `boolIntExample`:

| id `INT` | status `TINYINT(1)` |
| -------- | ------------------- |
| 1        | 0                   |
| 2        | 1                   |

And the following model:

```ts twoslash
import { db, SQL, columns } from "./snippets/mysql-db";
// ---cut---
const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    status: columns.booleanInt(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT status FROM boolIntExample WHERE id = ${id}`,
});
```

A query for row id `1` yields:

```ts twoslash
import { db, SQL, columns } from "./snippets/mysql-db";

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    status: columns.booleanInt(),
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
import { db, SQL, columns } from "./snippets/mysql-db";

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    status: columns.booleanInt(),
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
