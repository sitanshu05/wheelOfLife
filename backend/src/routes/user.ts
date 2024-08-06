import express from "express"
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import getUserInfo from "../controllers/user/getUserInfo";
import deleteUser from "../controllers/user/deleteUser";
import updateUserInfo from "../controllers/user/updateUserInfo";

const router = express.Router();

router.get("/info",authenticationMiddleware, getUserInfo)
router.put("/update",authenticationMiddleware, updateUserInfo)
router.delete("/delete",authenticationMiddleware, deleteUser)


export default router