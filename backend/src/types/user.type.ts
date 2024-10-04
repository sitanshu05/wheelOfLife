import IWheel from "./wheel.type";

export default interface IUser{
    _id?: string;
    email : string;
    username : string;
    password : string;
    frequency : number;
    wheels? : [string];
}