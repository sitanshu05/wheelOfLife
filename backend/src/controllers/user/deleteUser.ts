import { Request, Response } from "express";
import userModel from "../../models/user.model";
import IUser from "../../types/user.type";
import UserNotFoundError from "../../errors/UserNotFoundError";
import wheelModel from "../../models/wheel.model";
import HttpStatusCode from "../../utils/statusCodes";

const deleteUser = async(req : Request, res : Response) => {

    try{
        const {username} = req;
    
        const user : IUser | null = await userModel.findOne({username});
    
        if(!user){
            throw new UserNotFoundError()
        }
    
       await wheelModel.deleteMany({_id : {$in : user.wheels}});
    
       await userModel.deleteOne({username})
    
       res.status(HttpStatusCode.OK).json({
        message : "User deleted successfully"
       })
    }catch(err){
        if(err instanceof UserNotFoundError){
            res.status(HttpStatusCode.NOT_FOUND).json({
                message : "User not found"
            })
        }
    }

}

export default deleteUser