import path from "path";
import express from "express";
import dotenv from "dotenv";
import cp from "cookie-parser";
import connectDB from "./connectDb.js";
import {
  editUser,
  getUser,
  setUser,
  getNameAPI,
} from "./handlers/userHandler.js";
import { auth, login, logout } from "./handlers/authHandler.js";
import { handleError, errorConvert } from "./middleware/errorHandler.js";
import { createGPTChat } from "./handlers/chatHandler.js";
import {
  getChatContent,
  createChat,
  getChats,
} from "./handlers/chatHandler.js";
import { init_io } from "./socket.js";
import { verifyEnd, sendVerifyEnd } from "./handlers/verifyHandler.js";

connectDB();
dotenv.config({ path: "backend/config.env" });

const app = express();
const CWD = process.cwd();
app.use(express.json());
app.use(cp());
app.use("/dev", express.static(path.join(CWD, "dev")));
app.use("/frontend", express.static(path.join(CWD, "frontend")));

app.post("/api/user", setUser);
app.get("/api/user/:userId", getUser);
app.get("/api/name/:userId", getNameAPI);
app.get("/api/user", auth, getUser);
app.post("/api/edit", auth, editUser);
app.post("/api/login", login);
app.get("/api/logout", logout);

app.post("/api/message", auth, createGPTChat);
app.get("/api/chat/create", auth, createChat);
app.get("/api/c/:chatId", auth, getChatContent);
app.get("/api/chats", auth, getChats);

app.get("/api/verify/:token", verifyEnd);
app.post("/api/send", sendVerifyEnd);

app.get("*", (req, res, next) => {
  console.log("Request received");
  res.sendFile(path.join(CWD, "index.html"));
});

const port = process.env.PORT || 8000;
const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server running on port " + port);
});

init_io(server);
