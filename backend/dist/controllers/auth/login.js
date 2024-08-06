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
exports.logIn = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const InvalidCredentialsError_1 = __importDefault(require("../../errors/InvalidCredentialsError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const body = {
            handle: req.body.handle,
            password: req.body.password
        };
        const user = yield user_model_1.default.findOne({ $or: [{ username: body.handle }, { email: body.handle }] });
        console.log(body);
        if (!user || !(yield bcrypt_1.default.compare(body.password, user.password))) {
            throw new InvalidCredentialsError_1.default();
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username }, config_1.default.JWT_SECRET);
        res.status(statusCodes_1.default.OK).json({
            message: "Logged In",
            token
        });
    }
    catch (err) {
        if (err instanceof InvalidCredentialsError_1.default) {
            res.status(statusCodes_1.default.UNAUTHORIZED).json({
                message: "Invalid Credentials"
            });
        }
        else {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: "error while logging in"
            });
        }
    }
});
exports.logIn = logIn;
