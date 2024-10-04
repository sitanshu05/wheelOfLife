import mongoose from "mongoose"
import segmentSchema from "./segment.model"
import ISegment from "../types/segment.type"
import IWheel from "../types/wheel.type"
import { segmentNames } from "../constants"

const getDefaultWheel = () =>{

    let defaultSegments : ISegment[] = [];

    segmentNames.forEach(name => {
        const segment : ISegment = {name, rating: 0,improvements : ''}
        defaultSegments.push(segment);
    });
    return defaultSegments;

}

const wheelSchema = new mongoose.Schema({
    time : {
        type : Date,
        default : Date.now()
    },
    segments : {
        type : [segmentSchema],
        default : getDefaultWheel
    }
})

export default mongoose.model<IWheel>("Wheel",wheelSchema);
