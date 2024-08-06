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
const wheel_model_1 = __importDefault(require("../../models/wheel.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const UserNotFoundError_1 = __importDefault(require("../../errors/UserNotFoundError"));
const AuthorizationError_1 = __importDefault(require("../../errors/AuthorizationError"));
const getOneWheel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username } = req;
        const wheelId = req.params.id;
        const user = yield user_model_1.default.findOne({ username });
        if (!user) {
            throw new UserNotFoundError_1.default();
        }
        if (!((_a = user.wheels) === null || _a === void 0 ? void 0 : _a.includes(wheelId))) {
            throw new AuthorizationError_1.default();
        }
        const wheel = yield wheel_model_1.default.findById(wheelId);
        res.status(statusCodes_1.default.OK).json({
            wheel
        });
    }
    catch (err) {
        if (err instanceof UserNotFoundError_1.default) {
            res.status(statusCodes_1.default.NOT_FOUND).json({
                message: "User not found"
            });
        }
        else if (err instanceof AuthorizationError_1.default) {
            res.status(statusCodes_1.default.UNAUTHORIZED).json({
                message: "User does not have authorization over this wheel"
            });
        }
        else {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: err
            });
        }
    }
});
exports.default = getOneWheel;
