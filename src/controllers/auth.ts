import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import createHttpError from "http-errors";

import User from "../models/user";

export const getSignup = (req: Request, res: Response, next: NextFunction) => {
    res.render("auth/signup");
}

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await hash(password, 12);

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

export const getLogin = async (req: Request, res: Response, next: NextFunction) => {
    res.render("auth/login");
};


export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw createHttpError(404, "User not found.");
        }
        const isValidPassword = await compare(password, user.password);
        if (isValidPassword) {
            req.session.isLoggedIn = true;
            req.session.userId = user._id.toString();
            res.redirect("/");
        } else {
            throw createHttpError(401, "Password doesn't match.");
        }
    } catch (err) {
        next(err);
    }
};

export const postLogout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};