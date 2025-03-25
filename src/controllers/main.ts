import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

import Book from "../models/Book";
import User from "../models/User";

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
    res.render("index");
}

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, haveRead } = req.body;

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            throw createHttpError(404, "User not found.");
        }
        let book = await Book.findOne({ title: title, author: author });
        if (!book) {
            book = new Book({
                title: title,
                author: author,
                haveRead: haveRead
            });
        }
        user.library.push({
            bookId: book._id,
            addedAt: new Date()
        });
        await book.save();
        await user.save();
    } catch (err) {
        next(err);
    }
}