"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const getWheels_1 = __importDefault(require("../controllers/wheels/getWheels"));
const createWheel_1 = __importDefault(require("../controllers/wheels/createWheel"));
const getOneWheel_1 = __importDefault(require("../controllers/wheels/getOneWheel"));
const deleteOneWheel_1 = __importDefault(require("../controllers/wheels/deleteOneWheel"));
const updateWheel_1 = __importDefault(require("../controllers/wheels/updateWheel"));
const router = express_1.default.Router();
router.get("/:id", authenticationMiddleware_1.default, getOneWheel_1.default);
router.delete("/:id", authenticationMiddleware_1.default, deleteOneWheel_1.default);
router.put("/:id", authenticationMiddleware_1.default, updateWheel_1.default);
router.get("/", authenticationMiddleware_1.default, getWheels_1.default);
router.post("/create", authenticationMiddleware_1.default, createWheel_1.default);
exports.default = router;
