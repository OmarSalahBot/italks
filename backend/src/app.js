import express from 'express';
const app = express();
import notesRoutes from './Routes/notesRoutes.js';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import path from "path"

dotenv.config();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();



// middleware
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);

// make it ready from deployment
if(process.env.NODE_ENV === 'produciton'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*", (_,res)=>{
        res.sendFile(path.join(__dirname,'../frontend' , "dist" , "index.html"));
    });
}

connectDB().then(() => {
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
} )
});


