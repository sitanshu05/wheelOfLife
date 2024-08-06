"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const segmentArraySchema_1 = __importDefault(require("./segmentArraySchema"));
const zod_1 = __importDefault(require("zod"));
const wheelSchema = zod_1.default.object({
    time: zod_1.default.instanceof(Date),
    segments: segmentArraySchema_1.default
});
exports.default = wheelSchema;
