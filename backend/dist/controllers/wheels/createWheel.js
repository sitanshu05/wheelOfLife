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
const segmentArraySchema_1 = __importDefault(require("../../schemas/segmentArraySchema"));
const zod_1 = require("zod");
const UserNotFoundError_1 = __importDefault(require("../../errors/UserNotFoundError"));
const getFullSegment_1 = __importDefault(require("../../utils/getFullSegment"));
const createWheel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const segments = req.body.segments;
        segmentArraySchema_1.default.parse(segments);
        const fullSegment = (0, getFullSegment_1.default)(segments);
        const wheel = yield wheel_model_1.default.create({ segments: fullSegment });
        const user = yield user_model_1.default.findOneAndUpdate({ username: req.username }, { $push: { wheels: wheel } });
        if (!user) {
            throw new UserNotFoundError_1.default();
        }
        res.status(statusCodes_1.default.OK).json({
            message: "wheel created successfully",
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: "Invalid data",
                error: err
            });
        }
        else if (err instanceof UserNotFoundError_1.default) {
            res.status(statusCodes_1.default.NOT_FOUND).json({
                message: "User not found",
                error: err
            });
        }
        else {
            res.status(statusCodes_1.default.NOT_FOUND).json({
                message: "error in creating wheel",
                error: err
            });
        }
    }
});
exports.default = createWheel;
