import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Button } from "@mui/material";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";
import { lightBlue } from "@mui/material/colors";

const drawerWidth = 400;

function Sidebar({
  chatPreviews,
  map,
  switchChat,
  curChatId,
  createAppointment,
}) {
  console.log("chatPreviews", chatPreviews);
  return (
    <div id="Sidebar">
      <div class="fixed left-0 top-20 z-40 w-128 h-screen transition-transform -translate-x-full md:translate-x-0" aria-label="Sidenav">
        <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul class="space-y-2">
            <li>
              <button variant="contained" onClick={createAppointment} class="text-gray-800 dark:text-white inline-flex items-center bg-primary-700 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-100">
                New Appointment
              </button>
            </li>
            {chatPreviews.map((preview) => (
              <li
                key={preview.chatId}
                disablePadding
                sx={{
                  backgroundColor:
                    preview.chatId === curChatId ? lightBlue[100] : null,
                }}
              >
                <div onClick={() => switchChat(preview.chatId)} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span class="ml-3">Appointment on {preview.creationTime}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ChatComp(props) {
  const { window } = props;
  const {
    user,
    previews,
    chatContent,
    handleSend,
    switchChat,
    chatId,
    gptStatus,
    createAppointment,
  } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [map, setMap] = useState(new Map());
  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    async function loadMap() {
      if (!previews) return;
      const userMap = new Map();
      await Promise.all(
        previews.map(
          async (preview) =>
            await Promise.all(
              preview.users.map(async (userId) => {
                const resp = await axios.get(`/api/name/${userId}`);
                userMap.set(
                  userId,
                  resp.data.first && resp.data.last
                    ? `${resp.data.first} ${resp.data.last}`
                    : `${resp.data.first ?? ""}${resp.data.last ?? ""}`
                );
              })
            )
        )
      );
      userMap.set(user._id.toString(), "You");
      userMap.set("GPT", "Vitawise");
      setMap(userMap);
      setMapLoaded(true);
    }
    loadMap();
  }, [chatContent?.users]);

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    mapLoaded &&
    gptStatus && (

      <div class="flex min-h-screen bg-blue-100 dark:bg-gray-700"> 
        
        <Sidebar
          map={map}
          chatPreviews={previews}
          switchChat={switchChat}
          curChatId={chatId}
          createAppointment={createAppointment}
        /> 

        <div class="md:w-3/4 md:left-1/2 lg:left-1/4 sm:w-100dvh lg:py-3 md:py-3 sm:py-3 fixed bottom-0 w-full">
          <div className="flex">

          {!chatId && (
            <button variant="contained" onClick={createAppointment} class="w-full md:hidden text-gray-800 dark:text-white inline-flex items-center bg-primary-700 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-100">
              new appointment
            </button>
          )}
          {chatId && ( 
            <>
              <button variant="contained" onClick={createAppointment} class="md:hidden text-gray-800 dark:text-white inline-flex items-center bg-primary-700 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-100">
              new
              </button>
              <MessageInput
                className="w-full"
                style={{ flexGrow: 0, flexShrink: 0 }}
                placeholder="Aa"
                onSend={(event) => handleSend(chatContent._id.toString(), event)}
                attachButton={false}
              />
            </>
          )}

          </div>
        </div>
        
        <div className="relative">
          <div className="fixed top-20 md:left-1/2 lg:left-1/4 h-5/6 md:w-3/4 sm:w-100dvh flex-grow
            overflow-auto">
            <div className="px-2">
              {chatContent &&
              chatContent.conversation.map((msg, idx) => (
                <MessageGroup
                  key={`msg_${idx}`}
                  direction={
                    msg.sender_id === user._id.toString()
                      ? "outgoing"
                      : "incoming"
                  }
                  sender={map.get(msg.sender_id)}
                >
                  <MessageGroup.Messages>
                    {msg.render_text ? (
                      <Message
                        key={`message_${idx}`}
                        model={{
                          sentTime: msg.sentTime,
                        }}
                      >
                        <Message.HtmlContent html={msg.render_text} />
                        <Message.Header
                          sender={
                            msg.sender_id === user._id.toString()
                              ? 
                                null
                              : map.get(msg.sender_id)
                          }
                          sentTime={msg.sentTime}
                        />
                      </Message>
                    ) : (
                      <Message
                        key={`message_${idx}`}
                        model={{
                          message: msg.message,
                          sentTime: msg.sentTime,
                        }}
                      >
                        <Message.Header
                          sender={
                            msg.sender_id === user._id.toString()
                              ? 
                                null
                              : map.get(msg.sender_id)
                          }
                          sentTime={msg.sentTime}
                        />
                      </Message>
                    )}
                  </MessageGroup.Messages>
                </MessageGroup>
              ))}
            </div>
          </div>
        </div>           
      </div>
    )
  );
}
