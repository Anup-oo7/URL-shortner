import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

const token = mongoose.model('loginToken', tokenSchema);
export default token;