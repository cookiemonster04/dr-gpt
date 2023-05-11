// user management with socket
// Reference: https://github.com/jigar-sable/instagram-mern

import { Server } from "socket.io";
import Chat from "./models/chatModel.js";
import {genAnswer} from "./handlers/chatHandler.js";
import getTime from "./handlers/timeHandler.js";

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId && user.socketId === socketId) &&
    users.push({ userId: userId, socketId: socketId }) &&
    console.log("added user: uid, sid:", userId, socketId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log("removed user - new users:", users);
};

const getSocketUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getChat = async (userId, chatId) => {
  const chat = await Chat.findById(chatId);
  if (chat === null) {
    console.log("null debug chatId", chatId);
    console.log(chat);
    console.log("why's this null");
  }
  if (!chat.users.some((id) => userId === id)) {
    console.log("unauthorized");
    return undefined; // unauthorized
  }
  return chat;
};

const pushMessage = (chat) => async (chatId, message) => {
  chat.users.forEach((targetId) => {
    // if (targetId === userId) return;
    const user = getSocketUser(targetId);
    console.log("sendMessage curUser", user);
    io.to(user?.socketId).emit("getMessage", chatId, message);
  });
  chat.conversation.push(message);
  await chat.save();
};

let io = null;
const init_io = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:8000",
    },
  });
  io.on("connection", (socket) => {
    console.log("connecting socket...");
    socket.on("connect", () => {
      console.log("new connection!", socket.id);
    });
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log("added user - new users:", users);
    });
    socket.on("sendMessage", async (userId, chatId, content) => {
      console.log("Received sendMessage");
      console.log(userId, chatId, content);
      const chat = await getChat(userId, chatId);
      const formattedDate = getTime();
      const message = {
        sender_id: userId,
        message: content,
        sentTime: formattedDate,
      };
      pushMessage(chat)(chatId, message);
      if (chat.users.length === 1) {
        // GPT conversation
        genAnswer(chatId, pushMessage(chat));
      }
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};

export { init_io, pushMessage };
