"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const getUserInfo_1 = __importDefault(require("../controllers/user/getUserInfo"));
const deleteUser_1 = __importDefault(require("../controllers/user/deleteUser"));
const updateUserInfo_1 = __importDefault(require("../controllers/user/updateUserInfo"));
const router = express_1.default.Router();
router.get("/info", authenticationMiddleware_1.default, getUserInfo_1.default);
router.put("/update", authenticationMiddleware_1.default, updateUserInfo_1.default);
router.delete("/delete", authenticationMiddleware_1.default, deleteUser_1.default);
exports.default = router;
