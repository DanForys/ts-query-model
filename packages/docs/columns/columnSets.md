---
outline: deep
---

# Column Sets

Column sets are collections of columns you can reuse across
multiple queries.

For convenience you can use the `buildColumnSet()` function to define
your column types. This allows you to re-use the columns across
queries without having to redefine them each time.

`buildColumnSet()` returns an object with functions you can use to
add the columns to your query:

- `get([col1], [col2])` - return specific columns
- `getAll()` - return all columns

## Examples

### Build a column set

```ts twoslash
import { buildColumnSet, columns } from "ts-query-model";

// define the columns we need. We'll use these across multiple queries
const columnSet = buildColumnSet({
  id: columns.number(),
  name: columns.string(),
  email: columns.string(),
});
```

The returned `columnSet.get()` function returns a set of columns
for use in a query. It'll return the column for each name argument:

```ts twoslash
import { buildColumnSet, columns } from "ts-query-model";

const columnSet = buildColumnSet({
  id: columns.number(),
  name: columns.string(),
  email: columns.string(),
});
// ---cut---
const exampleCols = columnSet.get("id", "email");
console.log(exampleCols);
// -> { id: NumberColumn, email: StringColumn }
```

Use `columnSet.getAll()` to use all the defined columns:

```ts twoslash
import { buildColumnSet, columns } from "ts-query-model";

const columnSet = buildColumnSet({
  id: columns.number(),
  name: columns.string(),
  email: columns.string(),
});
// ---cut---
const exampleCols = columnSet.getAll();
console.log(exampleCols);
// -> { id: NumberColumn, name: StringColumn, email: StringColumn }
```

### Use a column set in a query

Use the returned `get()` or `getAll()` function to provide the `columns`
for a model definition:

```ts twoslash
import { columns, Database, buildColumnSet } from "ts-query-model";
import MySQLConnection from "ts-query-model/mysql";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

const columnSet = buildColumnSet({
  id: columns.number(),
  name: columns.string(),
  email: columns.string(),
});
// ---cut---
const myAwesomeModel = {
  getThings: db.getMany({
    name: "get-all-things",
    // spread your column set here to add these columns to the query
    columns: columnSet.get("id", "email"),
    query: () => SQL`SELECT id, email FROM things`,
  }),
  getOnlyEmails: db.getMany({
    name: "get-only-email",
    // re-use the column set anywhere with different column names
    columns: columnSet.get("email"),
    query: () => SQL`SELECT id, email FROM things`,
  }),
};
```
