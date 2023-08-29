import mysql from "mysql2/promise";
import config from "../config/config.js";

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    // Always close the connection whether the query was successful or not
    connection.end();
  }
}

export { query };
