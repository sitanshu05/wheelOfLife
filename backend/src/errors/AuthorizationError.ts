export default class AuthorizationError extends Error {
    constructor() {
      super("Unauthorized")
    }
  }
  