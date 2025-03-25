import { Router } from "express";

import * as authController from "../controllers/auth";

const router = Router();

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

export default router;