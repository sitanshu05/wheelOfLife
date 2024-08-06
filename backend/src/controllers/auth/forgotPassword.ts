import { Request, Response } from "express";
import nodemailer from "nodemailer";
import IUser from "../../types/user.type";
import userModel from "../../models/user.model";
import UserNotFoundError from "../../errors/UserNotFoundError";
import HttpStatusCode from "../../utils/statusCodes";
import { ZodError } from "zod"
import emailSchema from "../../schemas/emailSchema";
import getConfig from "../../config"

const forgotPassword = async(req : Request, res : Response) => {

    try { 

        const {email} = req.body;

        emailSchema.parse(email)

        const user : IUser | null = await userModel.findOne({email})

        if(!user){
            throw new UserNotFoundError();
        }
        const transporter = nodemailer.createTransport({
            service : "gmail",
            host : "smtp.gmail.com",
            port:587,
            secure : false,
            auth : {
                user : getConfig.EMAIL_ADDRESS,
                pass : getConfig.EMAIL_PASS
            }
    
        })

        const mailOptions = {
            from : {
                name : "Sitanshu",
                address : "wheeeeloflife@gmail.com"
            },
            to : "sitanshuhallad2002@gmail.com",
            subject: "Wheel of Life Password resent Link",
            text : "Please resent your password by clicking on this link, expires in 30 minutes\n"
        }

        await transporter.sendMail(mailOptions)
        
        res.status(HttpStatusCode.OK).json({
            message : "Password resent link sent to your email"
        });

    }catch(err){
        if(err instanceof UserNotFoundError){
            res.status(HttpStatusCode.NOT_FOUND).json({
                message : "This email id does not exist"
            })
        }else if(err instanceof ZodError){
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message : "Invalid email ID"
            })
        }

    }
}

export default forgotPassword