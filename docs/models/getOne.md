---
outline: deep
---

# getOne()

Factory method to create a query function to return one row (or `null`) from a query.

## Method signature

`getOne({ name?: string, columns: QueryColumns, query: GenericQueryFunction})`

- `name` - optional name for logging
- `columns` - columns returned from the query. See [column concepts](/columns/concepts.html)
- `query` - function which returns the query to be executed. See [querying](/querying.html#query)

## Return value

An async query function. Invoking this function with the arguments required by `query`
will execute the query and return the result.

## Query results

- `null` if no rows were returned from the query
- Row object with keys and types from `columns`
