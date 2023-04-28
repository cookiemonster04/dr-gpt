import React from "react";
import Chat from "../components/Chat";
import { Navigate } from "react-router-dom";

const ChatPage = ({ user, themeMode }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <h1>New Converstaion</h1>
      <Chat />
    </div>
  );
  
};

export { ChatPage };
