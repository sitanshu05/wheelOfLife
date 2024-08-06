import express from "express";
import authRouter from "./auth";
import wheelRouter from "./wheels"
import userRouter from "./user"

const router = express.Router()

declare module "express-serve-static-core" {
    interface Request {
      username? : string
    }
  }

router.use("/auth",authRouter);
router.use("/wheel",wheelRouter)

router.use("/user",userRouter)

export default router
