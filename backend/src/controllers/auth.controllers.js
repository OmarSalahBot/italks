import User from '../models/user.model.js';
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcryptjs";

export  const signUp = async (req , res ) => {
    try{
        const {username , email , password } = req.body;
        // Make sure all the field are full 
        if(!username || !email || !password){
            return res.status(400).json({message : "All fields are required"})
        }
        // Checking if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({errType:"Password",message : "Password must contain capital and small letter and numbers and should be longer than 6 items"})
        }

        // Checking the email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({errType:"email", message: "Enter a vaild email please "})
        }
        
        const newUserEmail = await User.findOne({email: email});
        const newUserName = await User.findOne({username: username.toLowerCase()});

        // Make sure that email is unique
        if(newUserEmail) return res.status(400).json({message : "Email is already exist"});

        // Make sure that username is unique
        if(newUserName) return res.status(400).json({message : "Username is already exists"});
        
        // Make incrypting the password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // creating the new user
        const newUser = await User({ username : username , email:email , password: hashPassword});
        if(newUser){
            generateToken(newUser._id , res);
            await newUser.save();
            res.status(201).json({message: "User Created Successfully" , newUser})
        }else {
            res.status(400).json({message:"Invalid user data"})
        }


    }catch(err) {
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
} 