export default class UserExistsError extends Error {
    constructor(message : string){
        super(message);
    }
}