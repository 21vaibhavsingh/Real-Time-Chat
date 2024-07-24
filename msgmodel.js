import mongoose from "mongoose";
const msgmodel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:string,
        required:true
    }
}, {timestamps:true});
export const message = mongoose.model("Messaage",msgmodel);