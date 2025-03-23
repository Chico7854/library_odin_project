"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./routes/main"));
const auth_1 = __importDefault(require("./routes/auth"));
const MONGODB_URI = "mongodb+srv://lacus7854:dl2RZ1UdK4Xd$9N@librarycluster.ncdub.mongodb.net/library?retryWrites=true&w=majority&appName=libraryCluster";
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(main_1.default);
app.use(auth_1.default);
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    app.listen(3000);
})
    .catch(err => console.log(err));
