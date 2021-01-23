import { Router } from "express";
import { surpriseMeController } from "../controllers/surpriseMe.controller";

const router: Router = Router();
const baseUrls: string = "/phishing";

router.get(baseUrls, surpriseMeController.getCredentials);


export const phishingRouter: Router = router;
