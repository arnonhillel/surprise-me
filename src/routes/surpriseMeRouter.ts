import { Router } from "express";
import { surpriseMeController } from "../controllers/surpriseMe.controller";

const router: Router = Router();
const baseUrls: string = "/surprise";

router.get(baseUrls, surpriseMeController.getSurprise);

export const surpriseMeRouter: Router = router;
