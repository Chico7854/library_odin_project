"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    library: [{
            bookId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Book",
                required: true
            },
            addedAt: {
                type: Date,
                required: true
            }
        }]
});
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=User.js.map