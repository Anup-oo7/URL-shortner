import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const verificationTokenSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    token: {
        type: String,
        required: true
    },

    createdAt:{
        type: String,
        expires:3600,
        default: Date.now()
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    }
})

//////////////////////// OTP HASHING ///////////////////////////////

verificationTokenSchema.pre('save', async function (next){
    if (this.isModified('token')){
        const hash = await bcrypt.hash(this.token, 8);
        this.token = hash
    }
    next()
})

////////////////////////////// COPARING HASHED OTP FOR VERIFICATION ////////////////
verificationTokenSchema.methods.compareToken = async function(token){
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}
const verificationToken = mongoose.model('verification_token', verificationTokenSchema);
export default verificationToken;