import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import getConfig from "../../config"
import IUser from "../../types/user.type";
import userModel from "../../models/user.model";
import HttpStatusCode from "../../utils/statusCodes";
import { isValid } from "zod";

const validateToken = async (req : Request, res : Response) => {

    try {const authorization = req.headers.authorization;
        if(!authorization || !authorization.startsWith('Bearer ')){
            throw new Error("Unauthorized")
        }

        const token = authorization.split(' ')[1];

        const decoded : JwtPayload = jwt.verify(token,getConfig.JWT_SECRET) as JwtPayload;

        const username = decoded.username;

        const user : IUser | null = await userModel.findOne({username});
        let isValid : boolean = false;

        if(user != null){
            isValid = true;
        }

        res.status(isValid ? HttpStatusCode.OK : HttpStatusCode.UNAUTHORIZED).json({
            isValid
        }) 
    }catch(err){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            isValid : false
        })
    }
}

export {validateToken}