"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCredentialsError extends Error {
    constructor() {
        super("Invalid credentials");
    }
}
exports.default = InvalidCredentialsError;
