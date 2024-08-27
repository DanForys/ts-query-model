---
outline: deep
---

# write()

Factory method to create a query function to write to the database. Use for any `INSERT`, `UPDATE` or `DELETE` queries.

## Method signature

`write({ name?: string, query: GenericQueryFunction})`

- `name` - optional name for logging
- `query` - function which returns the query to be executed. See [querying](/querying.html#query)

## Return value

An async query function. Invoking this function with the arguments required by `query`
will execute the query.

## Query results

The result from the database library in use. The [ResultSetHeader](https://sidorares.github.io/node-mysql2/docs/documentation/typescript-examples#resultsetheader) for MySQL.
