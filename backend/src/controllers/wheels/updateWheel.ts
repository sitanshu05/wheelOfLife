import { Request, Response } from "express";
import ISegment from "../../types/segment.type";
import segmentArraySchema from "../../schemas/segmentArraySchema";
import IUser from "../../types/user.type";
import userModel from "../../models/user.model";
import UserNotFoundError from "../../errors/UserNotFoundError";
import IWheel from "../../types/wheel.type";
import AuthorizationError from "../../errors/AuthorizationError";
import wheelModel from "../../models/wheel.model";
import WheelNotFoundError from "../../errors/WheelNotFoundError";
import HttpStatusCode from "../../utils/statusCodes";

function updateWheelSegments(originalWheel : IWheel, newSegments : ISegment[]) : IWheel{

    const segments : ISegment[] = originalWheel.segments.map((segment)=>{
        for(let i = 0; i< newSegments.length;i++){
            if(newSegments[i].name === segment.name){
                return newSegments[i];
            }
        }

        return segment;
    })

    originalWheel.segments = segments;

    return originalWheel
}

const updateOneWheel = async(req : Request, res : Response) => {
    try{
        const {username} = req
        const newSegments : ISegment[] = req.body.segments;
        const wheelId = req.params.id;

        segmentArraySchema.parse(newSegments);

        const user : IUser | null = await userModel.findOne({username})

        if(!user){
            throw new UserNotFoundError()
        }
        if(!user.wheels?.includes(wheelId)){
            throw new AuthorizationError();
        }

        const currentWheel : IWheel | null = await wheelModel.findById(wheelId)

        if(!currentWheel){
            throw new WheelNotFoundError()
        }

        const updatedWheel = updateWheelSegments(currentWheel,newSegments);

        const newWheel = await wheelModel.findByIdAndUpdate(wheelId,updatedWheel,{new : true});

        res.status(HttpStatusCode.OK).json({
            message : "Wheel updated successfully",
            wheel : newWheel
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
        }else if(err instanceof WheelNotFoundError){
            res.status(HttpStatusCode.NOT_FOUND).json({
                message : "wheel not found"
            })
        }
        else{
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : err
            })
        }
    }
}

export default updateOneWheel