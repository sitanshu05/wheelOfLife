"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WheelNotFoundError extends Error {
    constructor() {
        super();
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = WheelNotFoundError;
