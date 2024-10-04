import express from "express";
import getConfig from "./config"
import rootRouter from  "./routes"
import mongoose from "mongoose";
import cors from "cors"
import helmet from "helmet";
import sanitize from "express-mongo-sanitize"


const app = express();
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(sanitize())
app.use("/api",rootRouter);

app.get("/testing",(req,res)=>{
    res.send("Test Succesful")
})

mongoose.connect(getConfig.MONGO_URL).then(()=>{
    app.listen(getConfig.PORT || 8080,()=>{
        console.log(`Listening on port ${getConfig.PORT || 8080} `)
    })
})

export default app
