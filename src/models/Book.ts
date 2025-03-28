import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    haveRead: {
        type: Boolean,
        required:  true
    }
});

export default model("Book", bookSchema);