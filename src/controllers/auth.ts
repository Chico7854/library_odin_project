import { Request, Response, NextFunction } from "express";

import User from "../models/user";

export const getSignup = (req: Request, res: Response, next: NextFunction) => {
    res.render("auth/signup");
}

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        username: username,
        email: email,
        password: password
    });

    try {
        await user.save();
        res.redirect("/");
    } catch (err) {
        next(err);
    }
}