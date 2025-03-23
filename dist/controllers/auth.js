"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignup = exports.getSignup = void 0;
const user_1 = __importDefault(require("../models/user"));
const getSignup = (req, res, next) => {
    res.render("auth/signup");
};
exports.getSignup = getSignup;
const postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const user = new user_1.default({
        username: username,
        email: email,
        password: password
    });
    user.save()
        .then(() => {
        res.redirect("/");
    })
        .catch(err => {
        console.log(err);
    });
};
exports.postSignup = postSignup;
