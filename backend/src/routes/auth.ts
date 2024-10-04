import express from "express";
import {signUp } from "../controllers/auth/signup";
import {logIn}  from "../controllers/auth/login";
import forgotPassword from "../controllers/auth/forgotPassword";
import { validateToken } from "../controllers/auth/validateToken";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import { changePassword } from "../controllers/auth/changePassword";
import { resetPassword } from "../controllers/auth/resetPassword";

const router = express.Router();


router.post("/signup",signUp)
router.post("/login",logIn)
router.post("/forgotpassword",forgotPassword)
router.get("/validatetoken",validateToken)
router.put("/changepassword",authenticationMiddleware,changePassword)
router.put("/resetpassword/:token",resetPassword)



export default router