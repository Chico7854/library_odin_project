import path from "path";

import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectMongoDBStore from "connect-mongodb-session"
import mongoose from "mongoose";
import cors from "cors";
import { doubleCsrf } from "csrf-csrf";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";

import mainRoutes from "./routes/main";
import authRoutes from "./routes/auth";

const MONGODB_URI = "mongodb+srv://lacus7854:dl2RZ1UdK4Xd$9N@librarycluster.ncdub.mongodb.net/library?retryWrites=true&w=majority&appName=libraryCluster";

const app = express();
const mongoDBStore = connectMongoDBStore(session);
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
});
const { generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => "my secret",
    cookieName: "csrf-protection",
    cookieOptions: { secure: true, maxAge: 604800000 },
    getTokenFromRequest: (req) => req.body._csrf || req.headers["x-csrf-token"]
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
    session({
        secret: "my secret",
        saveUninitialized: false,
        resave: false,
        store: store
    })
);
app.use((req: Request, res: Response, next: NextFunction) => {
    next();
})
app.use(cookieParser());
app.use(doubleCsrfProtection);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.isAuthorized = req.session.isLoggedIn;
    res.locals.csrfToken = generateToken(req, res);
    next();
});

app.use(mainRoutes);
app.use(authRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
})

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));