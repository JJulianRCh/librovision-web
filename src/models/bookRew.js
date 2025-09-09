import { Schema, model, models } from "mongoose"

const bookRewSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    userID: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    review: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    }
});

export default models.BookRew || model("Book", bookRewSchema);
