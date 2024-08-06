"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const segmentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    improvements: {
        type: String,
        maxLength: 30
    }
});
exports.default = segmentSchema;
