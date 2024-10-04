import mongoose from "mongoose";
import IFeedback from "../types/feedback.type";

const feedbackSchema = new mongoose.Schema({
    rating : {
        type : Number,
        required : true
    },
    feedback : {
        type : String,
        required : false
    }
})

export default mongoose.model<IFeedback>("Feedback",feedbackSchema)