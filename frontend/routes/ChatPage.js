import React from "react";
import Chat from "../components/Chat";
import { Navigate } from "react-router-dom";

const ChatPage = ({ user, themeMode }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Chat />;
};

export { ChatPage };
