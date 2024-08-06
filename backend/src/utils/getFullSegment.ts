import ISegment from "../types/segment.type";
import { segmentNames } from "../constants";

const getFullSegment = (segmentsWithValue : ISegment[]) : ISegment[] => {

    const fullSegment : ISegment[] = segmentNames.map((segmentName) => {

        for (let segmentIdx = 0; segmentIdx < segmentsWithValue.length; segmentIdx++) {
            if(segmentName === segmentsWithValue[segmentIdx].name){
                return segmentsWithValue[segmentIdx];
            }
        }

        const segment : ISegment = {
            name : segmentName,
            rating : 0,
            improvements : ""
        }
        return segment;
    })

    return fullSegment
    
}

export default getFullSegment