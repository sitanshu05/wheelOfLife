import getConfig from "../config"
import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port:587,
    secure : false,
    auth : {
        user : getConfig.EMAIL_ADDRESS,
        pass : getConfig.EMAIL_PASS
    }

})