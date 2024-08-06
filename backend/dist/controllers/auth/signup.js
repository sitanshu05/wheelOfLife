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
exports.signUp = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const userSchema_1 = __importDefault(require("../../schemas/userSchema"));
const UserExistsError_1 = __importDefault(require("../../errors/UserExistsError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        userSchema_1.default.parse(user);
        if (yield user_model_1.default.findOne({ $or: [{ username: user.username }, { email: user.email }] })) {
            throw new UserExistsError_1.default(`username/email already exists`);
        }
        const hashedPassword = yield bcrypt_1.default.hash(user.password, config_1.default.SALT_ROUNDS);
        yield user_model_1.default.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        const token = jsonwebtoken_1.default.sign({ username: user.username }, config_1.default.JWT_SECRET);
        res.status(statusCodes_1.default.OK).json({
            message: "User created successfully",
            token
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: "Invalid data passed"
            });
        }
        else if (err instanceof UserExistsError_1.default) {
            res.status(statusCodes_1.default.CONFLICT).json({
                message: "User already exists"
            });
        }
        else {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: "Error occurred when creating a user",
                errorMessage: err
            });
        }
    }
});
exports.signUp = signUp;
