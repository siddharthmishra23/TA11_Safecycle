import express from "express";
const router = express.Router();
import getAccidentInfo from "../services/getAccidentInfo.js";

/* GET Accident info */
router.get("/", async (req, res, next) => {
  try {
    res.json(await getAccidentInfo());
  } catch (err) {
    console.error(`Error while getting accident information`, err.message);
    next(err);
  }
});

export default router;
