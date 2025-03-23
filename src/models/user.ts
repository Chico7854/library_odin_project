import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
    library: [
        {
            title: { type: String, required: true },
            author: String,
            haveRead: { type: Boolean, required: true },
        }
    ]
})

export default mongoose.model("User", userSchema);