import { Request, Response } from "express";
import nodemailer from "nodemailer";
import IUser from "../../types/user.type";
import userModel from "../../models/user.model";
import UserNotFoundError from "../../errors/UserNotFoundError";
import HttpStatusCode from "../../utils/statusCodes";
import { ZodError } from "zod"
import emailSchema from "../../schemas/emailSchema";
import getConfig from "../../config"
import jwt from "jsonwebtoken"
import {transporter} from "../../utils/emailTransporter"

const forgotPassword = async(req : Request, res : Response) => {

    try { 

        const {email} = req.body;

        emailSchema.parse(email)

        const user : IUser | null = await userModel.findOne({email})

        if(!user){
            throw new UserNotFoundError();
        }


        const token = jwt.sign({_id : user._id},getConfig.JWT_SECRET,{expiresIn : "30m"});

        const mailOptions = {
            from : {
                name : "Wheel of Life",
                address : "wheeeeloflife@gmail.com"
            },
            to : email,
            subject: "Wheel of Life Password resent Link",
            html : `<h2>Please click on the link below to reset your password</h2>
                <h2><a href="${getConfig.CLIENT_URL}/resetpassword?token=${token}">Click here</a></h2>`
        }

        await transporter.sendMail(mailOptions)
        
        res.status(HttpStatusCode.OK).json({
            message : "Password resent link sent to your email, if email is registered with us"
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