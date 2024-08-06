"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const userSchema = zod_1.default.object({
    username: zod_1.default.string().min(4).max(30).toLowerCase().trim(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.default = userSchema;
