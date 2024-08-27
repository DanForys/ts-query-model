---
outline: deep
---

# getMany()

Factory method to create a query function to return many rows from a query.

## Method signature

`getMany({ name?: string, columns: QueryColumns, query: GenericQueryFunction})`

- `name` - optional name for logging
- `columns` - columns returned from the query. See [column concepts](/columns/concepts.html)
- `query` - function which returns the query to be executed. See [querying](/querying.html#query)

## Return value

An async query function. Invoking this function with the arguments required by `query`
will execute the query and return the results.

## Query results

- `[]` if no rows were returned from the query
- Array of row objects with keys and types from `columns`
