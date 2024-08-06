import mongoose from "mongoose"
import IUser from "../types/user.type"
import IWheel from "../types/wheel.type";
import { Schema } from "zod";
const userSchema : mongoose.Schema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        minLength : 4,
        maxLength : 30,
        
    },
    frequency : {
        type : Number,
        min:1,
        maz:12,
        default: 4,
        
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    wheels : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Wheel'
    }

})


export default mongoose.model<IUser>("User",userSchema);