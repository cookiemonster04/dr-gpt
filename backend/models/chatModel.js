import mongoose, { Schema } from "mongoose";
const model_name = "Chat";

const chatSchema = new Schema({
    conversation: [{
        sender_name: String,
        message: String
    }],
});

const Chat = mongoose.model(model_name, chatSchema);
export default Chat;
