import { Router, Request } from "express";
import { compare } from "bcrypt";
const { body } = require("express-validator");  //for some reason it only works this way

import User from "../models/User";
import * as authController from "../controllers/auth";
import isAuthenticated from "../middleware/isAuthenticated";

const router = Router();

router.get("/signup", authController.getSignup);

router.post("/signup", 
    [
        body("email")
            .isEmail().withMessage("Invalid email.")
            .custom(async (email: string) => {
                const user = await User.findOne({ email: email });
                if (user) {
                    throw new Error("Email has already been used.");
                }
            })
            .normalizeEmail(),
        body("password", "Enter a password with numbers and letters and at least 8 characters.").isLength({ min: 4 }).isAlphanumeric().trim(),
        body("confirmPassword").custom((confirmPassword: string, { req }: { req: Request }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error("Passwords don't match.");
            } else {
                return true;
            }
        })
    ],
    authController.postSignup);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", isAuthenticated, authController.postLogout);

export default router;