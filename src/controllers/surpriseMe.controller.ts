import { Response, Request } from "express";
import { surpriseMeService } from "../services/surprise-me.service";

class SurpriseMeController {
  public async getSurprise(req: Request, res: Response) {
    let name: string = req.query.name + '';
    let birthYear: string=req.query.birth_year + '';
    const a = await surpriseMeService.doSurpriseMeMethode(name,birthYear)
    console.log(a); 
    console.log(req.query);
    res.status(200).send(a); 
  }
}

export const surpriseMeController = new SurpriseMeController();
