import mongoose from "mongoose";

const urlShortner_userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
    },

    verified:{
        type:Boolean,
        default:false,
        required: true

    },

    urls_details: [{ 
        originalUrl: String,
        shortUrl: String,
        clicks: {
            type: Number,
            default: 0,
        },
    }]
   
})

const user = mongoose.model('signup_user_details',urlShortner_userSchema)

export default user;