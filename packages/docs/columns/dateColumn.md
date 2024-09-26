---
outline: deep
---

# `columns.date()`

## When to use

- Your TypeScript code expects a `Date` object
- The database library returns a `Date` for the column

## How it works

Returns a `Date` object if the database library is configured to return
JavaScript `Date` instancesf or `DATETIME` and `TIMESTAMP` columns.

Do not use this if string values are returned.

## Nullability

If the column allows `null` values, use `columns.dateNull()`.

## Example

Given the following database table `dateExample`:

| id `INT` | date `DATETIME`     |
| -------- | ------------------- |
| 1        | 2024-01-01 00:00:00 |
| 2        | 2025-01-01 00:00:00 |

And the following model:

```ts twoslash
// @noErrors
import { db, SQL, columns } from "./snippets/mysql-db";
// ---cut---
const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    date: columns.date(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT date FROM dateExample WHERE id = ${id}`,
});
```

A query for row id `1` yields:

```ts twoslash
// @noErrors
import { db, SQL, columns } from "./snippets/mysql-db";

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    date: columns.date(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT status FROM boolIntExample WHERE id = ${id}`,
});
// ---cut---
const result = await getExampleRow({ id: 1 });
if (result) {
  console.log(result.date);
  //                 ^?
}

// -> Date: Mon Jan 01 2024 00:00:00 GMT+0000
```
