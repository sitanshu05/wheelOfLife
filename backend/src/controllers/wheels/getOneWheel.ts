import { Request, Response } from "express";
import wheelModel from "../../models/wheel.model";
import userModel from "../../models/user.model";
import IUser from "../../types/user.type";
import IWheel from "../../types/wheel.type";
import HttpStatusCode from "../../utils/statusCodes";
import UserNotFoundError from "../../errors/UserNotFoundError";
import AuthorizationError from "../../errors/AuthorizationError";

const getOneWheel = async(req : Request, res : Response) => {

    try{
        const {username} = req;
        const wheelId = req.params.id;

        const user : IUser | null = await userModel.findOne({username});
    
        if(!user){
            throw new UserNotFoundError();
        }

        if(!user.wheels?.includes(wheelId)){
            throw new AuthorizationError()
        }

        const wheel : IWheel | null = await wheelModel.findById(wheelId)

        res.status(HttpStatusCode.OK).json({
            wheel
        })

    }catch(err){
        if(err instanceof UserNotFoundError){
            res.status(HttpStatusCode.NOT_FOUND).json({
                message : "User not found"
            })
        }else if(err instanceof AuthorizationError){
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                message : "User does not have authorization over this wheel"
            })
        }
        else{
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : err
            })
        }
    }
}

export default getOneWheel