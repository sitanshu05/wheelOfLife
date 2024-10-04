import { Request, Response } from "express";
import userModel from "../../models/user.model";
import IUser from "../../types/user.type";
import UserExistsError from "../../errors/UserExistsError";
import HttpStatusCode from "../../utils/statusCodes";
import UserNotFoundError from "../../errors/UserNotFoundError";
import jwt from "jsonwebtoken"
import getConfig from "../../config"
import { reminderMail } from "../../utils/reminderMail";

const updateUserInfo = async (req : Request, res : Response)=>{
    try{
        const {username} = req;
        const {email} = req.body;
        const {frequency} = req.body
        const newUsername = req.body.username;
    
        const existingUser : IUser | null = await userModel.findOne({$or : [
            {username : newUsername}, 
            {email}
        ]})

        if(existingUser){
            throw new UserExistsError("username is taken");
        }
        const oldUserInfo = await userModel.findOne({username})
        const user = await userModel.findOneAndUpdate({username}, {username : newUsername, email, frequency},{new : true})

        if(!user){
            throw new UserNotFoundError()
        }

        const token : string = jwt.sign({username : user.username},getConfig.JWT_SECRET)

        if(oldUserInfo?.frequency !== frequency){
            reminderMail(frequency,user.email,user.username)
        }


        res.status(HttpStatusCode.OK).json({
            message : "user info updated successfully",
            token : `Bearer ${token}`,
            user : {
                username : user.username,
                email : user.email,
                frequency : user.frequency
            }
        })
    }catch(err){
        if(err instanceof UserExistsError){
            res.status(HttpStatusCode.NOT_ACCEPTABLE).json({
                message : "username or email already taken"
            })
        }else if(err instanceof UserNotFoundError){
            res.status(HttpStatusCode.NOT_EXTENDED).json({
                message : "user not found"
            })
        }else{
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : "error while updating info",
                err
            })
        }
    }

}

export default updateUserInfo