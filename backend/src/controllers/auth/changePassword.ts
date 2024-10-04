import { Request, Response } from "express";
import UserNotFoundError from "../../errors/UserNotFoundError";
import userModel from "../../models/user.model";
import IUser from "../../types/user.type";
import bcrypt from "bcryptjs";
import HttpStatusCode from "../../utils/statusCodes";
import getConfig from "../../config";
import { Error } from "mongoose";

export const changePassword = async (req : Request,res : Response) => {

    try {
        const {username} = req;

        const user : IUser | null = await userModel.findOne({username});
        if(!user){
            throw new UserNotFoundError();
        }

        const {current_password,new_password} = req.body;

        if(!bcrypt.compareSync(current_password,user.password)){
            throw new Error("Current Password is Invalid");
        }
        const hashedPassword = await bcrypt.hash(new_password,getConfig.SALT_ROUNDS);

        await userModel.updateOne({username},{$set : {password : hashedPassword}});
        res.status(HttpStatusCode.OK).json({
            message : "Password changed successfully"
        })

    } catch (err:Error | any) {
        if(err instanceof UserNotFoundError){
            res.status(HttpStatusCode.NOT_FOUND).json({
                message : "User not found"
            })
        }else{
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : "Error while changing password",
                info : err.message
            })
        }
    }
}