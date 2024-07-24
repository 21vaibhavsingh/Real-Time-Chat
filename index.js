 // const express = require('express')  // method -1
import express from "express";   //method -2
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import msgRoute from "./routes/msgRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config({});

const app = express();

const PORT =process.env.PORT || 8080;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption)); 
//routes

app.use("/api/v1/user",userRoute);
app.use("/api/v1/msg",msgRoute);

app.listen(PORT, ()=>{

    connectDB();
    console.log(`server listen at port ${PORT}`);
});