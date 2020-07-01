import { Router } from "express";
import { statsController } from "../controllers/stats.controller";

const router: Router = Router();
const baseUrls: string = "/";

router.get(baseUrls, statsController.getAll);

export const statsRouter: Router = router;
