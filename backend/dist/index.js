"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors_1.default);
app.use("/api/v1", routes_1.default);
mongoose_1.default.connect(config_1.default.MONGO_URL).then(() => {
    app.listen(config_1.default.PORT, () => {
        console.log(`Listening on port ${config_1.default.PORT} `);
    });
});
