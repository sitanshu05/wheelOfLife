import { Request, Response } from "express";
import userModel from "../../models/user.model";
import IUser from "../../types/user.type";
import UserNotFoundError from "../../errors/UserNotFoundError";
import HttpStatusCode from "../../utils/statusCodes";

const getUserInfo = async (req : Request, res : Response) => {

    try{
        const {username} = req;
    
        const user : IUser | null = await userModel.findOne({username})
    
        if(!user){
            throw new UserNotFoundError()
        }
    
        res.status(HttpStatusCode.OK).json({
            user : {
                username : user.username,
                email : user.email,
                frequency : user.frequency
            }
        })
    }catch(err){
        res.status(HttpStatusCode.NOT_FOUND).json({
            message : "user not found",
            err
        })
    }

}

export default getUserInfo