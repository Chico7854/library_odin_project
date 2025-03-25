import { Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response) => {
    if (!req.session.isLoggedIn) {
        res.redirect("/");
    }
}

export default isAuthenticated;