---
outline: deep
---

# `columns.jsonString()`

## When to use

- Your TypeScript code expects a typed object
- Your database stores the object as a JSON encoded string

Do not use when using a native JSON database column and the database driver
returns a JavaScript object.

## How it works

This column type is generic and takes a generic parameter of the object
type stored in the database.

```ts twoslash
import { columns } from "ts-query-model";
// ---cut---
type MyStoredObject = {
  animal: string;
  canFly: boolean;
};

columns.jsonString<MyStoredObject>();
```

## Nullability

If the column allows `null` values, use `columns.jsonStringNull()`.

## Example

Given the following database table `animalExample`:

| id `INT` | attributes `TEXT`                        |
| -------- | ---------------------------------------- |
| 1        | `'{"animal":"capybara","canFly":false}'` |
| 2        | `'{"animal":"magpie","canFly":true}'`    |

And the following model:

```ts twoslash
// @noErrors
import { db, SQL, columns } from "./snippets/mysql-db";

// ---cut---
type MyStoredObject = {
  animal: string;
  canFly: boolean;
};

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    attributes: columns.jsonString<MyStoredObject>(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT pet FROM animalExample WHERE id = ${id}`,
});
```

A query for row id `1` yields:

```ts twoslash
// @noErrors
import { db, SQL, columns } from "./snippets/mysql-db";

type MyStoredObject = {
  animal: string;
  canFly: boolean;
};

const getExampleRow = db.getOne({
  name: "get-one-example-row",
  columns: {
    attributes: columns.jsonString<MyStoredObject>(),
  },
  query: ({ id }: { id: number }) =>
    SQL`SELECT attributes FROM animalExample WHERE id = ${id}`,
});
// ---cut---
const result = await getExampleRow({ id: 1 });
if (result) {
  console.log(result.attributes);
  //                 ^?
}

// -> { animal: 'capybara', canFly: false }
```
