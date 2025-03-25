import { Request, Response, NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.isLoggedIn) {
        res.redirect("/");
    }
    next();
}

export default isAuthenticated;