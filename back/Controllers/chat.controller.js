const Chat = require("../Models/chat")
const chatController = {}

chatController.saveChat = async(Message,user)=>{
    const newMessage = new Chat({
        chat:Message,
        user:{
            id:user._id,
            name:user.id
        }
    })
    await newMessage.save();
    return newMessage;
};


module.exports=chatController