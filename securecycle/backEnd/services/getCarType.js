import { query } from "./db.js";

async function getCarType() {
  const rows = await query(`SELECT * FROM cycledatabase.vehicle_type_count
  order by count desc;`);
  const data = rows;

  return {
    data,
  };
}

export default getCarType;
