import jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import "dotenv/config";

export const protectRoute = async (req ,res , next) => {
    try{
        let token = req.cookies.jwt;
        let Mobiletoken = req.headers.authorization?.split(" ")[1];
    // checking if the token is exists
    if(!token && !Mobiletoken) return res.status(401).json({ message:"Unauthorized - No token"});
    if( !token && Mobiletoken) token = Mobiletoken;
    // checking if the token is right
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    if(!decode) return res.status(401).json({ message:"Unauthorized - Invalid token"});

    const user = await User.findById(decode.userId).select("-password").select('-createdAt').select('-updatedAt');
    if(!user) return res.status(404).json({message:"User is not found"});
    req.user = user;
    next();

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }



}