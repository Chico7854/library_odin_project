import{ Schema, model , Types } from "mongoose";

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
    library: [{
        bookId: {
            type: Types.ObjectId,
            ref: "Book",
            required: true
        },
        addedAt: {
            type: Date,
            required: true
        }
    }]
})

export default model("User", userSchema);