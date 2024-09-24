---
outline: deep
---

# insert()

Factory method to create a query function to insert to the database.

## Method signature

`insert({ name?: string, table: string, columns: QueryColumns })`

- `name` - optional name for logging
- `table` - the database table to insert into
- `columns` - columns to be inserted. See [column concepts](/columns/concepts.html)

## Return value

An async query function. Invoking this function with a row of values will insert
a single row with those values into the database and return the row.

## Query results

- Array of row objects with keys and types from `columns`
- If a `numberAutoIncrement` column is preset, its value will be the auto-incremented value from the database
- `null` values will have been populated with default values when specified with the `{ default: [value] }` column option
