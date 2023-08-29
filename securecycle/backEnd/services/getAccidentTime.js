import { query } from "./db.js";

async function getAccidentTime() {
  const rows = await query(`SELECT * FROM accident_light`);
  const data = rows;

  return {
    data,
  };
}

export default getAccidentTime;
