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
exports.addBook = exports.getIndex = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Book_1 = __importDefault(require("../models/Book"));
const User_1 = __importDefault(require("../models/User"));
const getIndex = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.isLoggedIn) {
        return res.redirect("/login");
    }
    try {
        const user = yield User_1.default.findById(req.session.userId);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User not found.");
        }
        yield user.populate("library.bookId");
        res.render("index", {
            books: user.library
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getIndex = getIndex;
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, haveRead } = req.body;
    try {
        const user = yield User_1.default.findById(req.session.userId);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User not found.");
        }
        let book = yield Book_1.default.findOne({ title: title, author: author });
        if (!book) {
            book = new Book_1.default({
                title: title,
                author: author,
                haveRead: haveRead
            });
        }
        user.library.push({
            bookId: book._id,
            addedAt: new Date()
        });
        yield book.save();
        yield user.save();
    }
    catch (err) {
        next(err);
    }
});
exports.addBook = addBook;
//# sourceMappingURL=main.js.map