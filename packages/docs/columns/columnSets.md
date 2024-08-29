---
outline: deep
---

# Column Sets

Column sets are collections of columns you can reuse across
multiple queries.

For convenience you can use the `buildColumnSet()` function to define
your column types. This allows you to re-use the columns across
queries without having to redefine them each time.

`buildColumnSet()` returns a function you can use to
add the columns to your query. The function will return each column
name you supply as an argument.

## Examples

### Build a column set

```ts twoslash
import { buildColumnSet, columns } from "ts-query-model";

// define the columns we need. We'll use these across multiple queries
const getColumns = buildColumnSet({
  id: columns.numberColumn(),
  name: columns.stringColumn(),
  email: columns.stringColumn(),
});
```

The returned `getColumns` function returns a set of columns
for use in a query. It'll return the column for each name argument:

```ts twoslash
import { buildColumnSet, columns } from "ts-query-model";

const getColumns = buildColumnSet({
  id: columns.numberColumn(),
  name: columns.stringColumn(),
  email: columns.stringColumn(),
});
// ---cut---
const exampleCols = getColumns("id", "email");
console.log(exampleCols.columns);
// -> { id: NumberColumn, email: StringColumn }
```

### Use a column set in a query

Spread the `getColumns` function in a query in place of the `columns`
key:

```ts twoslash
import {
  columns,
  Database,
  MySQLConnection,
  buildColumnSet,
} from "ts-query-model";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

const getColumns = buildColumnSet({
  id: columns.numberColumn(),
  name: columns.stringColumn(),
  email: columns.stringColumn(),
});
// ---cut---
const myAwesomeModel = {
  getThings: db.getMany({
    name: "get-all-things",
    // spread your column set here to add these columns to the query
    ...getColumns("id", "email"),
    query: () => SQL`SELECT id, email FROM things`,
  }),
  getOnlyEmails: db.getMany({
    name: "get-only-email",
    // re-use the column set anywhere with different column names
    ...getColumns("email"),
    query: () => SQL`SELECT id, email FROM things`,
  }),
};
```
