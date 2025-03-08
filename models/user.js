const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    library: [
        {
            title: { type: String, required: true },
            author: String,
            haveRead: { type: Boolean, required: true },
        }
    ]
})

module.exports = mongoose.model("User", userSchema);