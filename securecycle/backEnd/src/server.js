import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";
import accidentInfoRouter from "../routes/getAccident.js";
import severityRouter from "../routes/getSeverity.js";
import accidentTimeRouter from "../routes/getAccidentTime.js";
import langLatRouter from "../routes/getLongLat.js";

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.get(/^(?!\/api).+/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });
app.use(express.static(path.join(__dirname, "../dist")));

// Use the accidentInfoRouter
app.use("/accidentDays", accidentInfoRouter);
app.use("/severity", severityRouter);
app.use("/accidentTime", accidentTimeRouter);
app.use("/LongLat", langLatRouter);
// should always the last
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
