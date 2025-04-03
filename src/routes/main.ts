import { Router } from "express";
const { body } = require("express-validator");    //only works this way

import * as mainController from "../controllers/main";
import isAuthenticated from "../middleware/isAuthenticated";

const router = Router();

router.get("/", mainController.getIndex);

router.post("/add-book", isAuthenticated, 
    [
        body("title").isLength({ min: 1 }).trim(),
        body("author").isLength({ min: 1 }).trim(),
    ],
    mainController.addBook);

export default router;