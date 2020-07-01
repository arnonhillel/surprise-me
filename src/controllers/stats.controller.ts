import { Response, Request } from "express";
const db = require("../models/statsModel/index.js");
const Tutorial = db.tutorials;
import {statsService} from '../services/stats.service'

class StatsController {
  public async getAll(req: Request, res: Response) {
    let a = await statsService.getAllData()
    // console.log(a); 
    // console.log(res.json);
    res.status(200).send(a); 
    

  }
}

export const statsController = new StatsController();
