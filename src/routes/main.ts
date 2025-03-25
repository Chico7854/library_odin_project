import { Router } from "express";

import * as mainController from "../controllers/main";
import isAuthenticated from "../middleware/isAuthenticated";

const router = Router();

router.get("/", mainController.getIndex);

router.post("/add-book", isAuthenticated, mainController.addBook);

export default router;