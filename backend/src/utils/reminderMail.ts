import nodemailer from 'nodemailer';
import cron from "node-cron"
import {transporter} from "./emailTransporter"
import getConfig from "../config"

export const reminderMail = (frequency : number,email : string,name : string) => {


      const mailOptions = {
        from: 'wheeeeloflife@gmail.com',
        to: email,
        subject: 'Wheel Of Life Reminder',
        html : `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wheel of Life Assessment Reminder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        .header h1 {
            color: #ff6600;
            font-size: 24px;
            margin: 0;
        }

        .content {
            line-height: 1.6;
        }

        .content p {
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ff6600;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            font-size: 16px;
        }

        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>It's Time for Your Wheel of Life Assessment</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>This is a friendly reminder that you are scheduled to take your Wheel of Life assessment.</p>
            <p>Taking this assessment will help you evaluate the balance in various areas of your life and identify where you may need to focus more attention.</p>
            <p>Click the button below to start your assessment:</p>
            <p style="text-align: center;">
                <a href=${getConfig.CLIENT_URL} class="btn">Take Your Assessment</a>
            </p>
            <p>We encourage you to take a few minutes to reflect on your current life balance and see how you can improve.</p>
            <p>Best regards,<br>Your Wheel of Life Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Wheel of Life. All rights reserved.</p>
        </div>
    </div>
</body>

</html>`,
      };
      
      // Schedule email to be sent every 4 months
      cron.schedule(`0 20 15 *.${frequency} *`, () => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log('Error: ' + error);
          }
          console.log('Email sent: ' + info.response);
        });
      });
      
      console.log(`Email scheduling is set up for ${name} every ${frequency} months.`);
}