import express from "express";
const router = express.Router();
import getSeverity from "../services/getSeverity.js";

/* GET Accident info */
router.get("/", async (req, res, next) => {
  try {
    res.json(await getSeverity());
  } catch (err) {
    console.error(`Error while getting accident information`, err.message);
    next(err);
  }
});

export default router;
