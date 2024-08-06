"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("../controllers/auth/signup");
const login_1 = require("../controllers/auth/login");
const forgotPassword_1 = __importDefault(require("../controllers/auth/forgotPassword"));
const router = express_1.default.Router();
router.post("/signup", signup_1.signUp);
router.post("/login", login_1.logIn);
router.get("/forgotPassword", forgotPassword_1.default);
exports.default = router;
