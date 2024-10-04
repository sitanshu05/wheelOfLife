export default class UserNotFoundError extends Error {
    constructor() {
        super();
        Error.captureStackTrace(this, this.constructor);
    }
}
