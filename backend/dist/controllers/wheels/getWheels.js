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
const wheel_model_1 = __importDefault(require("../../models/wheel.model"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const getWheels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req;
        const user = yield user_model_1.default.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }
        const wheelIds = user.wheels;
        if (!wheelIds) {
            throw new Error("wheels is null");
        }
        const wheels = yield Promise.all(wheelIds.map((wheelId) => __awaiter(void 0, void 0, void 0, function* () {
            const wheel = yield wheel_model_1.default.findById(wheelId);
            return wheel;
        })));
        res.status(statusCodes_1.default.OK).json({
            wheels
        });
    }
    catch (err) {
        res.status(statusCodes_1.default.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});
exports.default = getWheels;
