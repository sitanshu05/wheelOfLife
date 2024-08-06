"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const getFullSegment = (segmentsWithValue) => {
    const fullSegment = constants_1.segmentNames.map((segmentName) => {
        for (let segmentIdx = 0; segmentIdx < segmentsWithValue.length; segmentIdx++) {
            if (segmentName === segmentsWithValue[segmentIdx].name) {
                return segmentsWithValue[segmentIdx];
            }
        }
        const segment = {
            name: segmentName,
            rating: 0,
            improvements: ""
        };
        return segment;
    });
    return fullSegment;
};
exports.default = getFullSegment;
