import express from 'express';
const app = express();
import notesRoutes from './routes/notesRoutes.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import "dotenv/config";
import path from "path"
import authRoutes from './routes/auth.routes.js';



const __dirname = path.resolve();




// middleware
app.use(express.json());
app.use(cookieParser());



app.use("/api/notes", notesRoutes);
app.use("/api/auth" , authRoutes);


const PORT = process.env.PORT || 3000;

// make it ready from deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get(/.*/, (_,res)=>{
        res.sendFile(path.join(__dirname,'../frontend' , "dist" , "index.html"));
    });

}

connectDB().then(() => {
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
} )
});


