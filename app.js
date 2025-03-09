const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");

const MONGODB_URI = "mongodb+srv://lacus7854:dl2RZ1UdK4Xd$9N@librarycluster.ncdub.mongodb.net/?retryWrites=true&w=majority&appName=libraryCluster"
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Allow-Control-Access-Origin", "*");
    res.setHeader("Allow-Control-Access-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Allow-Control-Access-Header", "Content-Type, Authorization");
    next();
})

app.use(mainRoutes);
app.use(authRoutes);

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));