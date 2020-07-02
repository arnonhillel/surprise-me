import { Response, Request } from "express";
import { surpriseMeService } from "../services/surprise-me.service";

class SurpriseMeController {
  public async getSurprise(req: Request, res: Response) {
    let name = req.query.name;
    let birthYear = req.query.birth_year;
    console.log(`naem : ${name} birth year : ${birthYear}`);
    if (!!name && !!birthYear) {
      const response = await surpriseMeService.doSurpriseMeMethod(
        name,
        birthYear
      );
      if (!response) {
        res
          .status(404) // HTTP status 404: NotFound
          .send("No surprise for you!");
      }
      console.log(response);
      console.log(req.query);
      res.status(200).send(response);
    }
    else {
      res
        .status(400) // HTTP status 404: NotFound
        .send("name and birth_year are mandatory");
    }
  }
}

export const surpriseMeController = new SurpriseMeController();
