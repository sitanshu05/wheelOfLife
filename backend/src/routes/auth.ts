import express from "express";
import {signUp } from "../controllers/auth/signup";
import {logIn}  from "../controllers/auth/login";
import forgotPassword from "../controllers/auth/forgotPassword";
import { validateToken } from "../controllers/auth/validateToken";

const router = express.Router();


router.post("/signup",signUp)
router.post("/login",logIn)
router.get("/forgotpassword",forgotPassword)
router.get("/validatetoken",validateToken)



export default router