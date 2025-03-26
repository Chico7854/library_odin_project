"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const csrf_csrf_1 = require("csrf-csrf");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const main_1 = __importDefault(require("./routes/main"));
const auth_1 = __importDefault(require("./routes/auth"));
const MONGODB_URI = "mongodb+srv://lacus7854:dl2RZ1UdK4Xd$9N@librarycluster.ncdub.mongodb.net/library?retryWrites=true&w=majority&appName=libraryCluster";
const app = (0, express_1.default)();
const mongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
});
const { generateToken, doubleCsrfProtection } = (0, csrf_csrf_1.doubleCsrf)({
    getSecret: () => "my secret",
    cookieName: "csrf-protection",
    cookieOptions: { secure: true, maxAge: 604800000 },
    getTokenFromRequest: (req) => req.body._csrf || req.headers["x-csrf-token"]
});
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, express_session_1.default)({
    secret: "my secret",
    saveUninitialized: false,
    resave: false,
    store: store
}));
app.use((req, res, next) => {
    next();
});
app.use((0, cookie_parser_1.default)());
app.use(doubleCsrfProtection);
app.use((req, res, next) => {
    res.locals.isAuthorized = req.session.isLoggedIn;
    res.locals.csrfToken = generateToken(req, res);
    next();
});
app.use(main_1.default);
app.use(auth_1.default);
app.use((req, res, next) => {
    res.status(404).render("404");
});
app.use((error, req, res, next) => {
    res.render("error.ejs", {
        errorMessage: error
    });
});
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    app.listen(3000);
})
    .catch(err => console.log(err));
//# sourceMappingURL=app.js.map