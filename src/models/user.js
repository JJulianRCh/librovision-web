import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    pwd: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "user"
    }
});

export default models.User || model('User', userSchema);
