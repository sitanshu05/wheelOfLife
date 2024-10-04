import express from "express"
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import getWheels from "../controllers/wheels/getWheels";
import createWheel from "../controllers/wheels/createWheel";
import getOneWheel from "../controllers/wheels/getOneWheel";
import deleteOneWheel from "../controllers/wheels/deleteOneWheel";
import updateOneWheel from "../controllers/wheels/updateWheel";


const router = express.Router();

router.get("/:id", authenticationMiddleware, getOneWheel)
router.delete("/:id", authenticationMiddleware,deleteOneWheel)
router.put("/:id",authenticationMiddleware,updateOneWheel)

router.get("/",authenticationMiddleware, getWheels);

router.post("/create",authenticationMiddleware,createWheel);


export default router