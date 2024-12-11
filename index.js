import mongoose from 'mongoose';
import dotenv from "dotenv";
import express from "express";
import route from "./Router/userRouter.js"
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.URL;

mongoose
    .connect(MONGOURL)
    .then(()=>{
        console.log("Database Connected");
        app.listen(PORT,()=>{
            console.log(`listen ${PORT}`)
        });
    })
    .catch((error)=>console.log(error));

app.use('/user',route);