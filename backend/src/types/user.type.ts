import IWheel from "./wheel.type";

export default interface IUser{
    email : string;
    username : string;
    password : string;
    frequency : number;
    wheels? : [string];
}