import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import "dotenv/config";
import path from "path"
import authRoutes from './routes/auth.routes.js';
import messagesRoutes from './routes/message.routes.js';
import cors from 'cors';
import {app ,server } from "./config/socket.js"


const __dirname = path.resolve();


// middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser());



app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messagesRoutes);


const PORT = process.env.PORT || 3000;

// make it ready from deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get(/.*/, (_,res)=>{
        res.sendFile(path.join(__dirname,'../frontend' , "dist" , "index.html"));
    });

}

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});


