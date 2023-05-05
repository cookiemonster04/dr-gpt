import path from "path";
import express from "express";
import dotenv from "dotenv";
import cp from "cookie-parser";
import connectDB from "./connectDb.js";
import { editUser, getUser, setUser } from "./handlers/userHandler.js";
import { auth, login, logout } from "./handlers/authHandler.js";
import { handleError, errorConvert } from "./middleware/errorHandler.js";
import { sendMessage } from "./handlers/chatHandler.js";
import { createChat, getChat, getChats } from "./handlers/chatHandler.js";

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
app.get("/api/user", auth, getUser);

app.post("/api/edit", auth, editUser);

app.post("/api/login", login);
app.get("/api/logout", logout);

app.post("/api/message", sendMessage);

app.get("/api/chat/create", createChat);
app.get("/api/c/:chatId", getChat);
app.get("/api/chats", getChats);

app.get("*", (req, res, next) => {
  console.log("Request received");
  res.sendFile(path.join(CWD, "index.html"));
});

let port = process.env.port || 8000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server running on port " + port);
});
