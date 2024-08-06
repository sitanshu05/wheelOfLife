export default class WheelNotFoundError extends Error {
    constructor() {
        super();
        Error.captureStackTrace(this, this.constructor);
    }
}
