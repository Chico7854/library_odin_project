import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";

import User from "../models/user";

export const getSignup = (req: Request, res: Response, next: NextFunction) => {
    res.render("auth/signup");
}

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = hash(password, 12);

    const user = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    try {
        await user.save();
        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();
        res.redirect("/");
    } catch (err) {
        next(err);
    }
}