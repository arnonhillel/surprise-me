import { Response, Request } from "express";
const db = require("../models/statsModel/index.js");
const Tutorial = db.tutorials;
import {statsService} from '../services/stats.service'

class StatsController {
  public async getAll(req: Request, res: Response) {
    let allData = await statsService.getAllData()
    res.status(200).send(allData); 
  }
}

export const statsController = new StatsController();
