import { Request, Response } from "express";
import wheelModel from "../../models/wheel.model";
import IWheel from "../../types/wheel.type";
import IUser from "../../types/user.type";
import userModel from "../../models/user.model";
import HttpStatusCode from "../../utils/statusCodes";
import ISegment from "../../types/segment.type";
import segmentArraySchema from "../../schemas/segmentArraySchema";
import { ZodError } from "zod";
import UserNotFoundError from "../../errors/UserNotFoundError";
import getFullSegment from "../../utils/getFullSegment";

const createWheel = async(req : Request, res : Response) => {

    try{
        const segments : ISegment[] = req.body.segments; 
        segmentArraySchema.parse(segments);

        const fullSegment = getFullSegment(segments);
        const wheel : IWheel = await wheelModel.create({segments : fullSegment});
        const user : IUser | null = await userModel.findOneAndUpdate({username : req.username},{$push : {wheels : wheel}})

        if(!user){
            throw new UserNotFoundError()
        }

        res.status(HttpStatusCode.OK).json({ 
            message : "wheel created successfully",
        })

    }catch(err){
        if(err instanceof ZodError){
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : "Invalid data",
                error : err
            })
        }else if(err instanceof UserNotFoundError){
            res.status(HttpStatusCode.NOT_FOUND).json({
                message : "User not found",
                error : err
            })
        }else{
            res.status(HttpStatusCode.NOT_FOUND).json({
                message: "error in creating wheel",
                error : err
            })
        }
    }

}

export default createWheel