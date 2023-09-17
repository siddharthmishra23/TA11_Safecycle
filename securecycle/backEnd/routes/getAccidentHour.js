import express from "express";
const router = express.Router();
import getAccidentHour from "../services/getAccidentHour.js";

/* GET Accident info */
router.get("/", async (req, res, next) => {
  try {
    const day = req.query.day;
    res.json(await getAccidentHour(day));
  } catch (err) {
    console.error(`Error while getting accident information`, err.message);
    next(err);
  }
});

export default router;
