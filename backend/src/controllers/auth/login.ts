import { Request, Response } from "express";
import IUser from "../../types/user.type";
import userModel from "../../models/user.model";
import HttpStatusCode from "../../utils/statusCodes";
import InvalidCredentialsError from "../../errors/InvalidCredentialsError"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import getConfig from "../../config"

const logIn = async (req : Request, res : Response) => {

    try{
        const body = {
            handle : req.body.handle,
            password : req.body.password
        }
        
        const user : IUser | null = await userModel.findOne({$or : [{username : body.handle}, {email : body.handle}]})

        if(!user || !await bcrypt.compare(body.password,user.password)){
            throw new InvalidCredentialsError();
        }

        const token : string = jwt.sign({username : user.username},getConfig.JWT_SECRET)

        res.status(HttpStatusCode.OK).json({
            message : "Logged In",
            token
        });


    }catch(err){
        if(err instanceof InvalidCredentialsError){
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                message : "Invalid Credentials"
            })
        }else{
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : "error while logging in"
            })
        }

    }


}


export {logIn}