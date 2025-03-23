import { Router } from "express";

import * as authController from "../controllers/auth";

const router = Router();

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

export default router;