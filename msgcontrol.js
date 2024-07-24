import { Conversation } from "../models/conversationmodel";

export const sendMessage = async (req,res) => {
    try{
        const senderId = req.id;
        const receivedId = req.params.id;
        const {message} = req.body;
        let gotConversation = await Conversation.findOne({
            participants:{$all :[senderId , receivedId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId, receivedId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receivedId,
            message
        });

        if(newMessage){
            gotConversation.message.push(newMessage._id);
        };
        await gotConversation.save();

        //socket io

        return res.status(201).json({
            message:"message send successfully !"
        })

    } catch (error) {
        console.log(error);
    }
}

export const getMessage = async (req,res) => {
    try{
        const receivedId = req.params.id;
        const senderId = req.id;
        const conservation = await Conservation.findOne({
            participants:{$all : [senderId,receivedId]}
        }).populate("message");
        return res.status(200).json(Conversation?.message);
    } catch (error) {
        console.log(error);
    }
}