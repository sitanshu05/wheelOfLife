import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    rating : {
        type : Number,
        default: 0,
        min: 0,
        max : 10
    },
    improvements : {
        type : String,
        maxLength : 30
    }
})

export default segmentSchema;