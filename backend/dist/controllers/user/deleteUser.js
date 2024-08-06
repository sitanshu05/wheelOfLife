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
const UserNotFoundError_1 = __importDefault(require("../../errors/UserNotFoundError"));
const wheel_model_1 = __importDefault(require("../../models/wheel.model"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req;
        const user = yield user_model_1.default.findOne({ username });
        if (!user) {
            throw new UserNotFoundError_1.default();
        }
        yield wheel_model_1.default.deleteMany({ _id: { $in: user.wheels } });
        yield user_model_1.default.deleteOne({ username });
        res.status(statusCodes_1.default.OK).json({
            message: "User deleted successfully"
        });
    }
    catch (err) {
        if (err instanceof UserNotFoundError_1.default) {
            res.status(statusCodes_1.default.NOT_FOUND).json({
                message: "User not found"
            });
        }
    }
});
exports.default = deleteUser;
