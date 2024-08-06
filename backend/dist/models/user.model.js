"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 4,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    wheels: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Wheel'
    }
});
exports.default = mongoose_1.default.model("User", userSchema);
