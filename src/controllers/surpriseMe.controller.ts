import { Response, Request } from "express";
import { surpriseMeService } from "../services/surprise-me.service";

class SurpriseMeController {
  public async getSurprise(req: Request, res: Response) {
    const a = await surpriseMeService.doRandomMethode()
    console.log(a);
    res.status(200).send(a);
  }
}

export const surpriseMeController = new SurpriseMeController();
