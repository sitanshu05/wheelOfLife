"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthorizationError extends Error {
    constructor() {
        super("Unauthorized");
    }
}
exports.default = AuthorizationError;
