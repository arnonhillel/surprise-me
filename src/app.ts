import express from "express";
import { surpriseMeRouter } from "./routes/surpriseMeRouter";
import { statsRouter } from "./routes/statsRouter";
import { MongoMemoryServer } from "mongodb-memory-server";
import "./models/statsModel/dbModel";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { phishingRouter } from "./routes/phishing";
const db = require("./models/statsModel/index.js");

const app = express();
const port = 3000;
const baseUrl = "/api";
const baseUrlStat = "/api/stats";
// Set up mongoose connection
let dev_db_url = "mongodb://localhost:27017/dbName";  

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data: any) => {
    console.log("Connected to the database!");
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  async function initDb(stats: any) { 
  let result = await stats.count();
  if(result === 0) { 
    stats.create({
      requests: 0,
      distribution: [], 
    });
  }
}

app.listen(port, async (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

app.use(baseUrl, surpriseMeRouter);
app.use(baseUrl, phishingRouter);
app.use(baseUrlStat, statsRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export { app };
