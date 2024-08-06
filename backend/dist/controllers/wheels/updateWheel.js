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
const segmentArraySchema_1 = __importDefault(require("../../schemas/segmentArraySchema"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const UserNotFoundError_1 = __importDefault(require("../../errors/UserNotFoundError"));
const AuthorizationError_1 = __importDefault(require("../../errors/AuthorizationError"));
const wheel_model_1 = __importDefault(require("../../models/wheel.model"));
const WheelNotFoundError_1 = __importDefault(require("../../errors/WheelNotFoundError"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
function updateWheelSegments(originalWheel, newSegments) {
    const segments = originalWheel.segments.map((segment) => {
        for (let i = 0; i < newSegments.length; i++) {
            if (newSegments[i].name === segment.name) {
                return newSegments[i];
            }
        }
        return segment;
    });
    originalWheel.segments = segments;
    return originalWheel;
}
const updateOneWheel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username } = req;
        const newSegments = req.body.segments;
        const wheelId = req.params.id;
        segmentArraySchema_1.default.parse(newSegments);
        const user = yield user_model_1.default.findOne({ username });
        if (!user) {
            throw new UserNotFoundError_1.default();
        }
        if (!((_a = user.wheels) === null || _a === void 0 ? void 0 : _a.includes(wheelId))) {
            throw new AuthorizationError_1.default();
        }
        const currentWheel = yield wheel_model_1.default.findById(wheelId);
        if (!currentWheel) {
            throw new WheelNotFoundError_1.default();
        }
        const updatedWheel = updateWheelSegments(currentWheel, newSegments);
        const newWheel = yield wheel_model_1.default.findByIdAndUpdate(wheelId, updatedWheel, { new: true });
        res.status(statusCodes_1.default.OK).json({
            message: "Wheel updated successfully",
            wheel: newWheel
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
        else if (err instanceof WheelNotFoundError_1.default) {
            res.status(statusCodes_1.default.NOT_FOUND).json({
                message: "wheel not found"
            });
        }
        else {
            res.status(statusCodes_1.default.BAD_REQUEST).json({
                message: err
            });
        }
    }
});
exports.default = updateOneWheel;
