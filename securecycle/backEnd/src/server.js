import exp from "constants";
import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "cyclestreet.mysql.database.azure.com",
  user: "cyclestreetdb",
  password: "Monash23",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(8003, () => {
  console.log("server running on 8003");
});
