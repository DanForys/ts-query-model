import SQL from "sql-template-strings";
import { columns, Database } from "ts-query-model";
import MySQLConnection from "ts-query-model/mysql";

const db = new Database(
  new MySQLConnection({
    uri: "mysql://your-database-connection-string",
  })
);

export { columns, db, SQL };
