import exp from "constants";
import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(cors());

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.use(express.static(path.join(__dirname, "../build")));

const db = mysql.createConnection({
  host: "cyclestreet.mysql.database.azure.com",
  user: "cyclestreetdb",
  password: process.env.AZURE_PASSWORD,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
