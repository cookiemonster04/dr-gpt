import mongoose, { Schema } from "mongoose";
const model_name = "Chat";

const chatSchema = new Schema({
  conversation: [
    {
      sender_id: String,
      message: String,
      sentTime: String,
      render_text: String,
      gpt_text: String,
    },
  ],
  users: [String],
  creationTime: String,
});

const Chat = mongoose.model(model_name, chatSchema);
export default Chat;
