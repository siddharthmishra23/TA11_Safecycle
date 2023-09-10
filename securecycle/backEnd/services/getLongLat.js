import { query } from "./db.js";

async function getLangLat() {
  const rows = await query(`SELECT * FROM bike_related_accident`);
  const data = rows;

  return {
    data,
  };
}

export default getLangLat;
