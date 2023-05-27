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

        <div className="relative">
          <div className="fixed top-20 md:left-1/2 lg:left-1/4 dark:bg-gray-700 h-5/6 w-120 flex-grow
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
            

              
              <div class="py-5">
                <MessageInput
                  style={{ flexGrow: 0, flexShrink: 0 }}
                  placeholder="Aa"
                  onSend={(event) =>
                    handleSend(chatContent._id.toString(), event)
                  }
                  disabled={
                    gptStatus.find((chat) => chat.chatId === chatId)
                      ?.restricted ?? false
                  }
                  // sendButton={false}
                  attachButton={false}
                />
              </div>

              
            
          </div>
        </div>
        






        
        {/* <div class="flex flex-row overflow-auto">

          <div class="basis-1/5"></div>

          <div class="basis-4/5">

            <div>
              <div class="mb-20"></div>
              <div class="px-5 flex flex-col justify-between bg-blue-100 dark:bg-gray-700">
                

                <div class="flex flex-col mt-5">

                <div class="flex justify-start mb-4">
                  <img
                    src={logo}
                    style={{ marginRight: "0.6rem", width: "3.6rem", height: "3.6rem" }}
                  />
                  <div
                    class="ml-2 py-3 px-4 bg-gray-600 dark:bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                  >
                    Welcome to Vitawise, Remember that the information provided on this website is for informational 
                    purposes only and should not be considered a substitute for professional medical advice, diagnosis, 
                    or treatment. The purpose of this website is to provide general information and assist users in 
                    understanding potential medical conditions based on their symptoms. However, it is crucial to note 
                    that the information provided on this website should not be solely relied upon for making medical 
                    decisions.
                  </div>
                </div>
                  
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
                <div class="py-5">
                  <MessageInput
                    style={{ flexGrow: 0, flexShrink: 0 }}
                    placeholder="Aa"
                    onSend={(event) =>
                      handleSend(chatContent._id.toString(), event)
                    }
                    disabled={
                      gptStatus.find((chat) => chat.chatId === chatId)
                        ?.restricted ?? false
                    }
                    // sendButton={false}
                    attachButton={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
              
      </div>
    )
  );
}
