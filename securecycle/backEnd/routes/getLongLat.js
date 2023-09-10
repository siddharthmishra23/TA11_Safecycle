import express from "express";
const router = express.Router();
import getLongLat from "../services/getLongLat.js";

/* GET Accident info */
router.get("/", async (req, res, next) => {
  try {
    res.json(await getLongLat());
  } catch (err) {
    console.error(`Error while getting accident information`, err.message);
    next(err);
  }
});

export default router;
