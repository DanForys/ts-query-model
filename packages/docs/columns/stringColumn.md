---
outline: deep
---

# `columns.string()`

## When to use

- Your TypeScript code expects a `string` value
- The database column is any string-like type eg `TEXT`, `VARCHAR`, `CHAR`

## How it works

It takes and returns `string` values only.

## Nullability

If the column allows `null` values, use `stringNull()`.

## Example

Given the following database table `stringExample`:

| id `INT` | info `TEXT`    |
| -------- | -------------- |
| 1        | 'Hello there!' |
| 2        | 'Snarf snarf'  |

And the following model:

```ts twoslash
import { db, SQL, columns } from "./snippets/mysql-db";

// ---cut---
const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    info: columns.string(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT info FROM stringExample WHERE id = ${id}`,
});
```

A query for row id `1` yields:

```ts twoslash
import { db, SQL, columns } from "./snippets/mysql-db";

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    info: columns.string(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT info FROM stringExample WHERE id = ${id}`,
});
// ---cut---
const result = await getExampleRow({ id: 1 });
if (result) {
  console.log(result.info);
  //                 ^?
}

// -> 'Hello there!'
```
