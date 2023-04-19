import User from "../models/userModel";
import Chat from "../models/chatModel";
import { catchWrap } from "../middleware/errorHandler";
import axios from "axios";

const createChat = catchWrap(
  async (req, res, next) => {
    const user = User.findById(req.userId);
    const newChat = new Chat({ conversation: [] });
    user.chats.append(newChat.id);
    await Promise.all(user.save(), newChat.save());
  },
  500,
  "Internal server error"
);

const getChat = catchWrap(async (req, res, next) => {
  const user = User.findById;
});

const sendMessage = catchWrap(
  async (req, res, next) => {
    // get chat history and prepend to request
    const { message } = req.body;
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
    res.status(200).json(response.choices[0].message.content);
  }
  //   500,
  //   "Internal server error"
);

export { sendMessage };
