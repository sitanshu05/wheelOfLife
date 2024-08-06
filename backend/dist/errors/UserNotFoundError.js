"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserNotFoundError extends Error {
    constructor() {
        super();
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = UserNotFoundError;
