import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../config/cloudinary.js';

export const getAllContacts = async ( req , res ) => {
    try  { 
        const loggedUserId = req.user._id;

        const allUsers = await User.find({_id : {$ne : loggedUserId }}).select("-password");
        res.status(200).json(allUsers);
    }catch(err){
        res.status(500).json({ message :"Server Error"});
        console.log("Server Error",err);
    }
}


export const getMessagesByUserId = async ( req , res ) => {
    try{
        const { id:chatUserId  } = req.params;
        const myId = req.user._id;
        console.log(myId, chatUserId);
        const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: chatUserId },
            { senderId: chatUserId, receiverId: myId },
        ],
    });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json({ message :"Server Error"});
        console.log("Server Error",err);
    }

};  

export const sendMessage = async ( req , res ) => {
    try{
        const { text , image } = req.body;
        const senderId = req.user._id;
        let imageUrl='';
        const {id:receiverId} = req.params;
        // check text and image are exist
        if(!text && !image) res.status(400).json({message:"You should send image or text"});
        // check if the is sending a msg to him self
        if(senderId.equals(receiverId)) res.status(400).json({message:"Cannot send messages to yourself"});
        
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
        return res.status(404).json({ message: "Receiver not found." });
        }

        if(image){
            const imageRes = await cloudinary.uploader.upload(image);
            imageUrl = imageRes.secure_url;
        }

        const sendMessage = new Message({
            senderId, 
            receiverId,
            text,
            image: imageUrl,
        });
        await sendMessage.save();
        res.status(200).json(sendMessage);
    }catch(err){
        res.status(500).json({ message :"Server Error"});
        console.log("Server Error",err);
    }
    
};

export const getChatPartners = async ( req , res ) => {
    try{

        const loggedUserId = req.user._id;
        const lastMessageMap = [];
        const allMessages = await Message.find({
            $or:[
                { senderId: loggedUserId },
                { receiverId : loggedUserId }
            ]
        });

        const ChatPartner = allMessages.map(msg => msg.senderId.equals(loggedUserId) ? msg.receiverId : msg.senderId );
        
        const uniqueChatPartners = await User.find({ _id: { $in: ChatPartner } }).select("-password");

        //geting the last msg in every chat 
        const ChatPartners = await Promise.all(
            uniqueChatPartners.map(async (user) => {
                const lastMsg = await Message.findOne({
                $or: [
                    { senderId: loggedUserId, receiverId: user._id },
                    { senderId: user._id, receiverId: loggedUserId },
                ],
                }).sort({ createdAt: -1 });

                return{
                    _id:user._id,
                    username:user.username,
                    email: user.email,
                    profilePic: user.profilePic,
                    lastmsg : lastMsg ? lastMsg.text : "image",
                    lastMsgTime: lastMsg.createdAt
                };
            })
            );
        res.status(200).json(ChatPartners);
    }catch(err){
        res.status(500).json({ message :"Server Error"});
        console.log("Server Error",err);
    }
};