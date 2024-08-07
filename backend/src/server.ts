import express from "express";
import getConfig from "./config"
import rootRouter from  "./routes"
import mongoose from "mongoose";
import cors from "cors"


const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/v1",rootRouter);

mongoose.connect(getConfig.MONGO_URL).then(()=>{
    app.listen(getConfig.PORT,()=>{
        console.log(`Listening on port ${getConfig.PORT} `)
    })
})
