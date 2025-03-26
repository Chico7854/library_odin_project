"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect("/");
    }
    next();
};
exports.default = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map