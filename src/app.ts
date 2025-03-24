import path from "path";

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";

import mainRoutes from "./routes/main";
import authRoutes from "./routes/auth";

const MONGODB_URI = "mongodb+srv://lacus7854:dl2RZ1UdK4Xd$9N@librarycluster.ncdub.mongodb.net/library?retryWrites=true&w=majority&appName=libraryCluster";
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

app.use(cors());
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