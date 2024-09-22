---
outline: deep
---

# Defining columns

The available column types can be imported with:

```ts twoslash
import { columns } from "ts-query-model";
```

See the menu on the left for details on the available
column types.

The column types perform these functions:

- transforming data from JavaScript types to SQL types
- transforming data from SQL types to JavaScript types
- providing type information for the TypeScript compiler

## Implementation

A single column definition has the following interface:

```ts
interface ColumnDefinition {
  toSQL: (valueFromJS: any) => any;
  fromSQL: (valueFromSQL: any) => any;
  nullable: boolean;
}
```

where:

- `toSQL` takes the JavaScript type and returns the SQL type
- `fromSQL` takes the SQL type and returns the JavaScript type
- `nullable` will validate whether or not the field can return `null`

### Example

To implementation of the `numberColumn` looks something like this:

```ts twoslash
const numberColumn = () => ({
  toSQL: (valueFromJS: number) => valueFromJS,
  fromSQL: (valueFromSQL: number) => valueFromSQL,
  nullable: false,
});
```

## Create your own types

You can use any types and transformations you wish as columns.
Just create an object with the `toSQL`, `fromSQL` functions
and `nullable` field following the `ColumnDefinition` above.
