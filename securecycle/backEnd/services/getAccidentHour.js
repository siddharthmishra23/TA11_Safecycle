import { query } from "./db.js";

async function getAccidentHour(day) {
  const rows = await query(`SELECT 
  h.hour_desc AS LABEL, 
  COALESCE(COUNT(b.OBJECTID), 0) AS COUNT
FROM 
  cycledatabase.hour_of_day h
LEFT JOIN 
  cycledatabase.bike_related_accident b ON h.hour_desc = b.ACCIDENT_HOUR AND b.DAY_OF_WEEK = "${day}"
GROUP BY 
  h.hour_desc
ORDER BY 
  LABEL;`);
  const data = rows;

  return {
    data,
  };
}

export default getAccidentHour;
