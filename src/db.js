import { createPool } from "mysql2/promise";

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } from "./config.js";

export const poll = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});

// console.log("db is connected");

// return conn;

//console.log(DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER);

//export const poll = mysql.createConnection(DATABASE_URL)
