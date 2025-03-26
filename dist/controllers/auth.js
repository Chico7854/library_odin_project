"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postLogin = exports.getLogin = exports.postSignup = exports.getSignup = void 0;
const bcrypt_1 = require("bcrypt");
const http_errors_1 = __importDefault(require("http-errors"));
const { validationResult } = require("express-validator"); //it only works this way for some fucking reason
const User_1 = __importDefault(require("../models/User"));
const getSignup = (req, res, next) => {
    res.render("auth/signup");
};
exports.getSignup = getSignup;
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        return res.redirect("/signup");
    }
    const { username, email, password } = req.body;
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 12);
    const user = new User_1.default({
        username: username,
        email: email,
        password: hashedPassword
    });
    try {
        yield user.save();
        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();
        res.redirect("/");
    }
    catch (err) {
        next(err);
    }
});
exports.postSignup = postSignup;
const getLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("auth/login");
});
exports.getLogin = getLogin;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            throw (0, http_errors_1.default)(404, "User not found.");
        }
        const isValidPassword = yield (0, bcrypt_1.compare)(password, user.password);
        if (isValidPassword) {
            req.session.isLoggedIn = true;
            req.session.userId = user._id.toString();
            res.redirect("/");
        }
        else {
            throw (0, http_errors_1.default)(401, "Password doesn't match.");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.postLogin = postLogin;
const postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
exports.postLogout = postLogout;
//# sourceMappingURL=auth.js.map