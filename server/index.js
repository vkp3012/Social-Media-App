import express from "express";
import mongoose from "mongoose"
import cors from "cors";
import cookieParser from "cookie-parser"
import http from "http";
import "dotenv/config";
const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())

let port = process.env.PORT || 3000

let server = http.createServer(app)

mongoose.connect(process.env.MONGO_DB)
    .then(()=>{
        console.log("Mongo Db is connected")
        server.listen(port,()=>{
            console.log(`Listening on ${port}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
