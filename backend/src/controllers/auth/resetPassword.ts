import { Request, Response } from "express";
import getConfig from "../../config"
import jwt, { JwtPayload } from "jsonwebtoken"
import userModel from "../../models/user.model";
import IUser from "../../types/user.type";
import HttpStatusCode from "../../utils/statusCodes";
import bcrypt from "bcryptjs"
import { Error } from "mongoose";

export const resetPassword = async (req : Request,res : Response) => {

    try{
        const {token} = req.params;
        const {password} = req.body;

        const decoded : JwtPayload = jwt.verify(token,getConfig.JWT_SECRET) as JwtPayload;

        const user : IUser | null = await userModel.findOne({_id : decoded._id});


        if(!user){
            throw new Error("User not found")
        }
        const hashedPassword = await bcrypt.hash(password,getConfig.SALT_ROUNDS);

        await userModel.findOneAndUpdate({_id : decoded._id}, {password : hashedPassword},{new : true});

        res.status(HttpStatusCode.OK).json({
            message : "Password reset successfully"
        })


    }catch(err : Error | any){

        res.status(HttpStatusCode.BAD_REQUEST).json({
            message : err.message
        })

    }

}