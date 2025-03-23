import { Router } from "express";

import * as mainController from "../controllers/main";

const router = Router();

router.get("/", mainController.getIndex);

export default router;