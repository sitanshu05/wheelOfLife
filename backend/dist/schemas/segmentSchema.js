"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const constants_1 = require("../constants");
const segmentSchema = zod_1.default.object({
    name: zod_1.default.enum(constants_1.segmentNames),
    rating: zod_1.default.number().min(0).max(10),
    improvements: zod_1.default.string().max(30)
});
exports.default = segmentSchema;
