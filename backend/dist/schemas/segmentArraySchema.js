"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const segmentSchema_1 = __importDefault(require("./segmentSchema"));
const segmentArraySchema = zod_1.default.array(segmentSchema_1.default).refine(items => {
    const names = items.map(item => { return item.name; });
    return new Set(names).size === names.length;
});
exports.default = segmentArraySchema;
