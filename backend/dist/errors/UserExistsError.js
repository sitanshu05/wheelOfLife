"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserExistsError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = UserExistsError;
