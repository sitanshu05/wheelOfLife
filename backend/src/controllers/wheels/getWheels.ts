import { Request, Response } from "express";
import userModel from "../../models/user.model";
import IUser from "../../types/user.type";
import wheelModel from "../../models/wheel.model";
import HttpStatusCode from "../../utils/statusCodes";
import IWheel from "../../types/wheel.type";

const getWheels = async(req : Request, res : Response) => {

    try{

        const {username} = req;
        const user : IUser | null = await userModel.findOne({username});
    
        if(!user){
            throw new Error("User not found");
        }
        const wheelIds = user.wheels;

        if(!wheelIds){
            throw new Error("wheels is null")
        }
        const wheels = await Promise.all(wheelIds.map(async (wheelId)  => {
            const wheel = await wheelModel.findById(wheelId)
            return wheel
        }))
    
        res.status(HttpStatusCode.OK).json({
            wheels 
        })
    }catch (err) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: err });
    }


}

export default getWheels