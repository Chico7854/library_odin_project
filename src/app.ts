import path from "path";

import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectMongoDBStore from "connect-mongodb-session"
import mongoose, { mongo } from "mongoose";
import cors from "cors";

import mainRoutes from "./routes/main";
import authRoutes from "./routes/auth";

const MONGODB_URI = "mongodb+srv://lacus7854:dl2RZ1UdK4Xd$9N@librarycluster.ncdub.mongodb.net/library?retryWrites=true&w=majority&appName=libraryCluster";

const app = express();
const mongoDBStore = connectMongoDBStore(session);
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(
    session({
        secret: "my secret",
        saveUninitialized: false,
        resave: false,
        store: store
    })
);

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