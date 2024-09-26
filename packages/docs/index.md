---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ts-query-model"
  text: "API documentation"
  tagline: Types for database queries with minimum fuss. Supports MySQL, PostgreSQL and SQLite.
  actions:
    - theme: brand
      text: About
      link: /about
    - theme: alt
      text: Installation
      link: /installation
    - theme: alt
      text: Configuration
      link: /configuration
    - theme: alt
      text: Querying basics
      link: /querying

features:
  - title: Write SQL
    details: No query builders. Just SQL.
  - title: Painless types
    details: Declare columns once. Get types automatically.
  - title: Lightweight
    details: No dependencies. No setup process.
---

## Quick overview

### 1. Connect to your database

```ts twoslash
import { Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/mysql";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);
```

### 2. Build your model

```ts twoslash
import { db, SQL, columns } from "./snippets/mysql-db";
// ---cut---
const myAwesomeModel = {
  getUsers: db.getMany({
    name: "get-all-users",
    columns: {
      id: columns.numberAutoIncrement(),
      name: columns.string(),
      dateCreated: columns.date(),
      isAwesome: columns.booleanInt(),
    },
    query: (limit: number) =>
      SQL`SELECT id, name, dateCreated, isAwesome FROM users LIMIT ${limit}`,
  }),
};
```

### 3. Easy, correctly typed queries

```ts twoslash
import { db, SQL, columns } from "./snippets/mysql-db";

const myAwesomeModel = {
  getUsers: db.getMany({
    name: "get-all-users",
    columns: {
      id: columns.numberAutoIncrement(),
      name: columns.string(),
      dateCreated: columns.date(),
      isAwesome: columns.booleanInt(),
    },
    query: (limit: number) =>
      SQL`SELECT id, name, dateCreated, isAwesome FROM users LIMIT ${limit}`,
  }),
};
// ---cut---
const awesomeUsers = await myAwesomeModel.getUsers(10);
```
