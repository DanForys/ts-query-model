---
outline: deep
---

# getValue()

Factory method to create a query function to return a single value from a query.
Useful if you want to query a single `COUNT()` result.

## Method signature

`getValue({ name?: string, columns: QueryColumns, columnName: string, query: GenericQueryFunction})`

- `name` - optional name for logging
- `columns` - columns returned from the query. See [column concepts](/columns/concepts.html)
- `columnName` - the column to the value from
- `query` - function which returns the query to be executed. See [querying](/querying.html#query)

## Return value

An async query function. Invoking this function with the arguments required by `query`
will execute the query and return the value from the column specified by `columnName`

## Query results

- `null` if no rows were returned by the query
- A value of the type of the specified column
