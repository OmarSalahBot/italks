import User from '../models/user.model.js';
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcryptjs";
import cloudinary from '../config/cloudinary.js';

export const signup = async ( req , res ) => {
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
        
        const newUserEmail = await User.findOne({email: email.toLowerCase()});
        const newUserName = await User.findOne({username: username.toLowerCase()});

        // Make sure that email is unique
        if(newUserEmail) return res.status(400).json({message : "Email is already exist"});

        // Make sure that username is unique
        if(newUserName) return res.status(400).json({message : "Username is already exists"});
        
        // Make incrypting the password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // creating the new user
        const newUser = new User({ username : username , email: email.toLowerCase() , password: hashPassword});
        if(newUser){
            await newUser.save();
            const token = generateToken(newUser._id , res);
            res.status(201).json({
            _id: newUser._id,
            name : newUser.username,
            email : newUser.email,
            token: token
        })
        }else {
            res.status(400).json({message:"Invalid user data"})
        }


    }catch(err) {
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
} 


export const login = async ( req , res ) => {
    try{
        const { email , password } = req.body;

        // checking if the fields is empty
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"})
        }

        const user  = await User.findOne({email:email.toLowerCase()});
        // checking if the email exists 
        if(!user) return res.status(400).json({message:"Invalid information"});

        // checking if the password is correct 
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid information"});

        const token = generateToken(user._id,res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            token:token
        });

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}


export const logout = (_,res) => {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message : "Logout successfully"})
}


export const updateProfile = async ( req , res ) => {
    try{
        const { profilePic } = req.body;
    // checking if the user entered the pfp
    if(!profilePic) return res.status(400).json({message:"Profile picture is required"});

    // getting the sender user id 
    const userId = req.user._id;

    // uploading the image 
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(userId , {profilePic: uploadResponse.secure_url} , {new:true}).select("-password").select('-createdAt').select('-updatedAt');

    res.status(200).json({message : "User Update Successfully ",updatedUser});
    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}