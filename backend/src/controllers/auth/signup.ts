import { Response, Request } from "express";
import IUser from "../../types/user.type";
import userModel from "../../models/user.model";
import HttpStatusCode from "../../utils/statusCodes";
import userSchema from "../../schemas/userSchema";
import UserExistsError from "../../errors/UserExistsError"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { ZodError } from "zod";
import getConfig from "../../config"
import { reminderMail } from "../../utils/reminderMail";

const signUp = async (req : Request, res: Response) =>{

    try{
        const user : IUser = {
            email : req.body.email,
            username : req.body.username,
            frequency : 4,
            password : req.body.password
        }

        userSchema.parse(user)
        if(await userModel.findOne({$or : [{username : user.username}, {email : user.email}]})){
            throw new UserExistsError(`username/email already exists`)
        }

        const hashedPassword = await bcrypt.hash(user.password, getConfig.SALT_ROUNDS)
        await userModel.create({...user,password : hashedPassword})

        const token = jwt.sign({username : user.username}, getConfig.JWT_SECRET)
        
        reminderMail(4,user.email,user.username)

    
        res.status(HttpStatusCode.OK).json({
                message: "User created successfully",
                token
            })
    }
    catch(err){
        if(err instanceof ZodError){
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : "Invalid data passed"
            })
        }else if(err instanceof UserExistsError){
            res.status(HttpStatusCode.CONFLICT).json({
                message : "User already exists"
            })
        }else{
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : "Error occurred when creating a user",
                errorMessage : err
            })
        }
    }
  
}

export {signUp};