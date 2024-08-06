"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const segment_model_1 = __importDefault(require("./segment.model"));
const constants_1 = require("../constants");
const getDefaultWheel = () => {
    let defaultSegments = [];
    constants_1.segmentNames.forEach(name => {
        const segment = { name, rating: 0, improvements: '' };
        defaultSegments.push(segment);
    });
    return defaultSegments;
};
const wheelSchema = new mongoose_1.default.Schema({
    time: {
        type: Date,
        default: Date.now()
    },
    segments: {
        type: [segment_model_1.default],
        default: getDefaultWheel
    }
});
exports.default = mongoose_1.default.model("Wheel", wheelSchema);
