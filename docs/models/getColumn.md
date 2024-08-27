---
outline: deep
---

# getColumn()

Factory method to create a query function to return an array of values from a single column.

## Method signature

`getColumn({ name?: string, columns: QueryColumns, columnName: string, query: GenericQueryFunction})`

- `name` - optional name for logging
- `columns` - columns returned from the query. See [column concepts](/columns/concepts.html)
- `columnName` - the column to return values from
- `query` - function which returns the query to be executed. See [querying](/querying.html#query)

## Return value

An async query function. Invoking this function with the arguments required by `query`
will execute the query and return the results from the column specified by `columnName`

## Query results

- `[]` if no rows were returned from the query
- Array of `columnName` values
