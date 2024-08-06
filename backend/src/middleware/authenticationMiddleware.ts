import { Request, Response, NextFunction } from "express"
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken"
import getConfig from "../config"
import HttpStatusCode from "../utils/statusCodes";

const authenticationMiddleware = async(req : Request, res : Response, next :NextFunction ) => {

    try{
        const authorization = req.headers.authorization;
        if(!authorization || !authorization.startsWith('Bearer ')){
            throw new Error("Unauthorized")
        }

        const token = authorization.split(' ')[1];

        const decoded : JwtPayload = jwt.verify(token,getConfig.JWT_SECRET) as JwtPayload;
        (req as any).username = decoded.username;
        next();

    }catch(err){
        if(err instanceof JsonWebTokenError){
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                message : "Unauthorized"
            })
        }else{
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                message : "Error in authentication"
            })
        }
        next(err);
    }


}

export default authenticationMiddleware;