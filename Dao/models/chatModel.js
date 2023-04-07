import mongoose from "mongoose";


const chatCollection = "chats"
const chatSchema = new mongoose.Schema({
    user:{
        type:String,
        unique:true,
        required:true
    },
    message:{
        type:String,
        required:true
    }
}, { versionKey: false})

export const chatModel = mongoose.model(chatCollection, chatSchema);
