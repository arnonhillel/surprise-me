import { Response, Request } from "express";
import { statsModel } from "../models/stats.model";
import { RequestType } from "../models/request-type.enum";
const db = require("../models/statsModel/index.js");
const Stats = db.stats;
class StatsService {
  public async getAllData(): Promise<statsModel> {
    return {
      requests: await Stats.count(),
      distribution: await this.getDistributionArray(),
    };
  }

  public async getDistributionArray() {
    let countTotalRequest = await Stats.count();
    if (countTotalRequest === 0) {
      return [];
    } else {
      return [
        {
          type: RequestType.CHUCK_NORRIS_JOKE,
          count: await Stats.count({ type: RequestType.CHUCK_NORRIS_JOKE }),
        },
        {
          type: RequestType.KANYE_QUOTE,
          count: await Stats.count({ type: RequestType.KANYE_QUOTE }),
        },
        {
          type: RequestType.NAME_SUM,
          count: await Stats.count({ type: RequestType.NAME_SUM }),
        },
      ];
    }
  }
}

export const statsService = new StatsService();
