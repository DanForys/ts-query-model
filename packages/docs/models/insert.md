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
- If a `numberAutoIncrement` column is present, its value will be the auto-incremented value from the database
- `null` values will have been populated with default values when specified with the `{ default: [value] }` column option

## Example

To insert a new user into an existing `users` table:

| id `INT AUTOINCREMENT` | name `TEXT` | dateCreated `DATETIME`  |
| ---------------------- | ----------- | ----------------------- |
| `1`                    | `"Kryten"`  | `"2024-01-10 13:00:00"` |

```ts twoslash
import { columns, Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/lib/mysql";
import SQL from "sql-template-strings";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

const userModel = {
  create: db.insert({
    name: "get-all-users",
    table: "users",
    columns: {
      id: columns.numberAutoIncrement(),
      name: columns.string(),
      dateCreated: columns.dateNull({ default: () => new Date() }),
    },
  }),
};

// Create a user
const newUser = await userModel.create({
  id: null,
  name: "Lister",
  dateCreated: null,
});

console.log(newUser);
// -> { id: 2, name: "Lister", dateCreated: "2024-09-25 11:00:00" }
//          ^ auto incremented              ^ populated by the default() function
```
