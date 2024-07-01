import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {userRouter} from "./routes/Users.js"
import {tblogRouter} from './routes/Tblogs.js'
import dotenv from 'dotenv';
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);
app.use("/tblogs", tblogRouter);


mongoose.connect(process.env.MONGO_URI).then(() => console.log("DATABASE CONNECTED!!"));
app.listen(process.env.PORT,() => console.log("SERVER RUNNING!!"));


