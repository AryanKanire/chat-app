
const Conversation = require("../models/coversationmodel");
const Message = require("../models/messagemodel");
const { getReciversocket, io } = require("../socket/socket");

module.exports.sendmessage = async(req,res)=>{
try {
    const {message} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    });

    if(!conversation){
        conversation= await Conversation.create({
            participants:[senderId,receiverId],
        })
    }

    const newmessage = new Message({
        senderId:senderId,
        receiverId:receiverId,
        message:message,
    })

    if(newmessage){
        conversation.message.push(newmessage);
    }

    // await conversation.save();
    // await newmessage.save();

    await Promise.all([conversation.save(),newmessage.save()])  //they will run parllely so wont take time

    const receiverSocketId = getReciversocket(receiverId);

    if(receiverSocketId){
        //io.to() send to specific client
        io.to(receiverSocketId).emit("newMessage",newmessage)
    }

    res.status(200).json(newmessage);

} catch (error) {
    console.log("error in message handeler",error.message);
    res.status(500).json({error:"Internal server error"});
}
}

module.exports.getmessage = async(req,res)=>{
    try {

        const {id:userTochatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all:[senderId,userTochatId]},
        }).populate("message")

        if(!conversation) return res.status(200).json([]);

        const message = conversation.message

        res.status(200).json(message);
        
    } catch (error) {
        console.log("error in message handeler",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}