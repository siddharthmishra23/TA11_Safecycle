import { query } from "./db.js";

async function getSeverity() {
  const rows = await query(`SELECT * FROM accident_severity`);
  const data = rows;

  return {
    data,
  };
}

export default getSeverity;
