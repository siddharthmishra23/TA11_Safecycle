import { query } from "./db.js";

async function getAccidentTime() {
  const rows = await query(`SELECT * FROM cycledatabase.city_bike_percentage;`);
  const data = rows;

  return {
    data,
  };
}

export default getAccidentTime;
