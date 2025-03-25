import { Router } from "express";

import * as authController from "../controllers/auth";
import isAuthenticated from "../middleware/isAuthenticated";

const router = Router();

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", isAuthenticated, authController.postLogout);

export default router;