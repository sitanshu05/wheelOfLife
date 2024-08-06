"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const UserNotFoundError_1 = __importDefault(require("../../errors/UserNotFoundError"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const zod_1 = require("zod");
const emailSchema_1 = __importDefault(require("../../schemas/emailSchema"));
const config_1 = __importDefault(require("../../config"));
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        emailSchema_1.default.parse(email);
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new UserNotFoundError_1.default();
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: config_1.default.EMAIL_ADDRESS,
                pass: config_1.default.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: {
                name: "Sitanshu",
                address: "wheeeeloflife@gmail.com"
            },
            to: "sitanshuhallad2002@gmail.com",
            subject: "Wheel of Life Password resent Link",
            text: "Please resent your password by clicking on this link, expires in 30 minutes\n"
        };
        yield transporter.sendMail(mailOptions);
        res.status(statusCodes_1.default.OK).json({
            message: "Password resent link sent to your email"
        });
    }
    catch (err) {
        if (err instanceof UserNotFoundError_1.default) {
            res.status(statusCodes_1.default.NOT_FOUND).json({
                message: "This email id does not exist"
            });
        }
        else if (err instanceof zod_1.ZodError) {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: "Invalid email ID"
            });
        }
    }
});
exports.default = forgotPassword;
