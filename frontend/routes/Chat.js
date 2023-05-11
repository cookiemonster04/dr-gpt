import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import axios from "axios";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import ChatComp from "../components/ChatComp";

const Chat = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  const [previews, setPreviews] = useState([]);
  const [chatContent, setChatContent] = useState(null);
  const [gptStatus, setGptStatus] = useState([]);
  const { chatId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getInfo() {
      const resp = await axios.get("/api/chats");
      console.log("getinfo", resp);
      setPreviews(resp.data.chatPreviews);
      setGptStatus(resp.data.gptStatus);
    }
    getInfo();
  }, []);
  useEffect(() => {
    if (!user) {
      return;
    }
    socket.on("connect", () => {
      console.log("client socket connect: connected");
    });
    const getMessage = (chatId, message) => {
      console.log("get message activated");
      setPreviews((previews) => {
        console.log("previews:", previews);
        const updated = previews.map((preview) =>
          preview.chatId === chatId
            ? { ...preview, lastMessage: message }
            : preview
        );
        console.log("updated:", updated);
        return updated;
      });
      setChatContent((curChat) =>
        curChat._id.toString() === chatId
          ? {
              ...curChat,
              conversation: [...curChat.conversation, message],
            }
          : curChat
      );
      if (gptStatus.some((chat) => chat._id.toString() === chatId)) {
        setGptStatus((gptStatus) =>
          gptStatus.map((chat) =>
            chat._id.toString() === chatId
              ? { ...chat, restricted: message.sender_id !== "GPT" }
              : chat
          )
        );
      }
    };
    socket.on("getMessage", getMessage);
    socket.emit("addUser", user._id.toString());
    socket.connect();
    return () => {
      // cleanup
      socket.off("getMessage", getMessage);
      socket.disconnect();
    };
  }, [user]);
  useEffect(() => {
    async function getChatContent() {
      if (!chatId) {
        setChatContent(null);
      } else {
        console.log(chatId);
        const resp = await axios.get(`/api/c/${chatId}`);
        console.log("getChatContent", resp);
        setChatContent(resp.data);
      }
    }
    getChatContent();
  }, [chatId]);
  const handleSend = (chatId, message) => {
    console.log("handle send activated");
    console.log(chatId, message);
    const userId = user._id.toString();
    socket.emit("sendMessage", userId, chatId, message);
  };
  const createAppointment = () => {
    navigate("/start");
  };
  const switchChat = async (chatId) => {
    navigate(`/chat/${chatId}`);
  };
  return (
    <ChatComp
      {...{
        user,
        previews,
        handleSend,
        chatContent,
        switchChat,
        chatId,
        gptStatus,
        createAppointment,
      }}
    />
  );
};

export default Chat;
