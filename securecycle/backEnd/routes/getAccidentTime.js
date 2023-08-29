import express from "express";
const router = express.Router();
import getAccidentTime from "../services/getAccidentTime.js";

/* GET Accident info */
router.get("/", async (req, res, next) => {
  try {
    res.json(await getAccidentTime());
  } catch (err) {
    console.error(`Error while getting accident information`, err.message);
    next(err);
  }
});

export default router;
