import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import createHttpError from "http-errors";
const { validationResult } = require("express-validator");  //it only works this way for some fucking reason

import User from "../models/User";

export const getSignup = (req: Request, res: Response, next: NextFunction) => {
    res.render("auth/signup");
}

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.flash = errors.array()[0].msg;
        return res.redirect("/signup");
    }
    
    const { username, email, password } = req.body;

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
            req.session.flash = "Email or password incorrect.";
            return res.redirect("/login");
        }
        const isValidPassword = await compare(password, user.password);
        if (isValidPassword) {
            req.session.isLoggedIn = true;
            req.session.userId = user._id.toString();
            return res.redirect("/");
        } else {
            req.session.flash = "Email or password incorrect.";
            return res.redirect("/login");
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