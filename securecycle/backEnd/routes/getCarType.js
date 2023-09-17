import express from "express";
const router = express.Router();
import getCarType from "../services/getCarType.js";

/* GET Accident info */
router.get("/", async (req, res, next) => {
  try {
    res.json(await getCarType());
  } catch (err) {
    console.error(`Error while getting accident information`, err.message);
    next(err);
  }
});

export default router;
