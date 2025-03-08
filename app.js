const path = require("path");

const express = require("express");

const routes = require("./routes/main");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(3000);