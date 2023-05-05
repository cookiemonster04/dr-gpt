import User from "../models/userModel";
import Chat from "../models/chatModel";
import { catchWrap } from "../middleware/errorHandler";
import axios from "axios";

const createChat = catchWrap(
  async (req, res, next) => {
    if (!req.user) {
      throw new Error();
    }
    const user = User.findById(req.userId);
    const newChat = new Chat({ conversation: [] });
    user.chats.append({ id: newChat._id, date: req.date });
    await Promise.all(user.save(), newChat.save());
    res.status(200).message("New chat created");
  },
  401,
  "Unauthorized"
);

const getChat = catchWrap(
  async (req, res, next) => {
    if (!req.user) {
      throw new Error();
    }
    const chatId = req.params.chatId;
    if (!req.user.chats.includes(chatId)) {
      throw new Error();
    }
    const chat = await Chat.findById(chatId);
    res.status(200).json(chat.conversation);
  },
  401,
  "Unauthorized"
);

// mainly for user sidebar chats list display
const getChats = catchWrap(
  async (req, res, next) => {
    if (!req.user) {
      throw new Error();
    }
    res.status(200).json(req.user.chats);
  },
  401,
  "Unauthorized"
);

const sendMessage = catchWrap(
  async (req, res, next) => {
    // get chat history and prepend to request
    const { id, message } = req.body;
    console.log(process.env["OPENAI_API_KEY"]);
    console.log(req);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env["OPENAI_API_KEY"],
        },
      }
    );
    console.log(response);
    const rmsg = response.data.choices[0].message.content;
    const chat = Chat.findById(id);
    chat.conversation.append({ sender_name: "user", message: message });
    chat.conversation.append({ sender_name: "GPT", message: rmsg });
    await chat.save();
    res.status(200).json(rmsg);
  }
  //   500,
  //   "Internal server error"
);

export { sendMessage, createChat, getChat, getChats };
