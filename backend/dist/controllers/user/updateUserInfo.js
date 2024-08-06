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
const user_model_1 = __importDefault(require("../../models/user.model"));
const UserExistsError_1 = __importDefault(require("../../errors/UserExistsError"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const UserNotFoundError_1 = __importDefault(require("../../errors/UserNotFoundError"));
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req;
        const { email } = req.body;
        const newUsername = req.body.username;
        const existingUser = yield user_model_1.default.findOne({ $or: [
                { username: newUsername },
                { email }
            ] });
        if (existingUser) {
            throw new UserExistsError_1.default("username is taken");
        }
        const user = yield user_model_1.default.findOneAndUpdate({ username }, { username: newUsername, email });
        if (!user) {
            throw new UserNotFoundError_1.default();
        }
        res.status(statusCodes_1.default.OK).json({
            message: "user info updated successfully",
            user: {
                username: user.username,
                email: user.email
            }
        });
    }
    catch (err) {
        if (err instanceof UserExistsError_1.default) {
            res.status(statusCodes_1.default.NOT_ACCEPTABLE).json({
                message: "username or email already taken"
            });
        }
        else if (err instanceof UserNotFoundError_1.default) {
            res.status(statusCodes_1.default.NOT_EXTENDED).json({
                message: "user not found"
            });
        }
        else {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: "error while updating info",
                err
            });
        }
    }
});
exports.default = updateUserInfo;
