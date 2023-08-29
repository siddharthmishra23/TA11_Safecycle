import { query } from "./db.js";

async function getAccidentInfo() {
  const rows = await query(`SELECT * FROM accident_day`);
  const data = rows;

  return {
    data,
  };
}

export default getAccidentInfo;
