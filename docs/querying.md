---
outline: deep
---

# Querying

The `Database` instance provides several factory methods to create
typed queries for you. These methods are:

- `getOne({ name?, columns, query })` - get a single row
- `getMany({ name?, columns, query })` - get multiple rows
- `getColumn({ name?, columns, columnName, query })` - get an array of values for a single column `columnName`
- `getValue({ name?, columns, columnName, query })` - get a single value from `columnName`
- `write({ name?, query })` - execute a write query

::: warning
Don't forget to add a `LIMIT` to ensure you are querying the right number
of rows for the factory method in use. This package does not do it for you!

For example, you'd want a `LIMIT 1` if you were using `getOne()`
:::

## Anatomy of a query factory call

### `name`

Optional string field to name the query. Used for logging purposes.

### `columns`

An object of keys and values where the keys are the column names and the values
are the column type functions.

For example:

```ts
columns: {
  id: columns.numberColumnAutoIncrement(),
  name: columns.stringColumn(),
  dateCreated: columns.dateColumn(),
  isBanned: columns.booleanIntColumn(),
}
```

### `query`

A function which returns a query to execute. The return value is passed verbatim
to the database library.

::: warning
SQL injection risk - ensure you are using placeholders for any user input
:::

It is recommended to use the [sql-template-strings](https://www.npmjs.com/package/sql-template-strings)
package for convenient templating and escaping of the SQL. For example:

```ts
import SQL from "sql-template-strings";

query: (loginName: string) => {
  SQL`SELECT * FROM loginEvents WHERE loginName = ${loginName}`;
};
```

Otherwise, you can use `?` placeholders and return an object with `sql` and `values` properties:

```ts
query: (loginName: string) => ({
  sql: `SELECT * FROM loginEvents WHERE loginName = ?`,
  values: [loginName],
});
```
