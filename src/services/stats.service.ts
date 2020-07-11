import { Response, Request } from "express";
import { statsModel } from "../models/stats.model";
import { RequestType } from "../models/request-type.enum";
const db = require("../models/statsModel/index.js");
const Stats = db.stats;
class StatsService {
  public async getAllData(): Promise<statsModel> {
    const countTotalRequest = await Stats.count();
    return {
      requests: countTotalRequest,
      distribution: await this.getDistributionArray(countTotalRequest),
    };
  }

  public async getDistributionArray(countTotalRequest:number) {
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
        {
          type: RequestType.BINARY_BIRTH_YEAR,
          count: await Stats.count({ type: RequestType.BINARY_BIRTH_YEAR }),
        },
      ];
    }
  }
}

export const statsService = new StatsService();
