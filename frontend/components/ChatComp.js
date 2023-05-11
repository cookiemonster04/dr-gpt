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

// Reference: https://mui.com/material-ui/react-drawer/
function Sidebar({
  chatPreviews,
  map,
  switchChat,
  curChatId,
  createAppointment,
}) {
  console.log("chatPreviews", chatPreviews);
  return (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Typography variant="h4" noWrap align="center" component="div">
          Chats
        </Typography> */}
        <NavLink to="/" className="site-title">
          <img
            src={logo}
            style={{ marginRight: "10px", width: "60px", height: "60px" }}
          />
        </NavLink>
        <Button variant="contained" onClick={createAppointment}>
          New Appointment
        </Button>
      </Toolbar>
      {/* icon up here */}
      <Divider />
      {chatPreviews.length ? (
        <List>
          {chatPreviews.map((preview) => (
            <ListItem
              key={preview.chatId}
              disablePadding
              sx={{
                backgroundColor:
                  preview.chatId === curChatId ? lightBlue[100] : null,
              }}
            >
              <ListItemButton onClick={() => switchChat(preview.chatId)}>
                {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
                {preview.users.length === 1 ? (
                  <>
                    <ListItemText primary={preview.creationTime} />
                    {preview.lastMessage && (
                      <ListItemText
                        // primary={`${
                        //   preview.lastMessage.sender.first !== "" &&
                        //   preview.lastMessage.sender.last !== ""
                        //     ? `${preview.lastMessage.sender.first} ${preview.lastMessage.sender.last}`
                        //     : `${preview.lastMessage.sender.first}${preview.lastMessage.sender.last}`
                        // }: ${preview.lastMessage.lastMessage}`}
                        primary={`${
                          map.get(preview.lastMessage.sender_id) ?? "Dr. GPT"
                        }: ${preview.lastMessage.message}`}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={preview.users
                        // .map((user) => `${user.first} ${user.last}`)
                        .map((user) => map.get(user))
                        .join(", ")}
                    />
                    {preview.lastMessage && (
                      <ListItemText
                        // primary={`${
                        //   preview.lastMessage.sender.first !== "" &&
                        //   preview.lastMessage.sender.last !== ""
                        //     ? `${preview.lastMessage.sender.first} ${preview.lastMessage.sender.last}`
                        //     : `${preview.lastMessage.sender.first}${preview.lastMessage.sender.last}`
                        // }: ${preview.lastMessage.lastMessage}`}
                        primary={`${map.get(preview.lastMessage.sender_id)}: ${
                          preview.lastMessage.message
                        }`}
                      />
                    )}
                  </>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="h6"
          noWrap
          align="center"
          component="div"
          sx={{ mt: "8px" }}
        >
          Create an appointment to start!
        </Typography>
      )}
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
      userMap.set("GPT", "Dr. GPT");
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "100%",
        }}
      >
        <CssBaseline />
        <AppBar
          id="appbar"
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            {chatContent && (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  {chatContent.users
                    .filter((cuser) => cuser != user._id.toString())
                    .map((cuser) => `${map.get(cuser)}`)
                    .join(", ")}
                </Typography>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {
              <Sidebar
                map={map}
                chatPreviews={previews}
                switchChat={switchChat}
                curChatId={chatId}
                createAppointment={createAppointment}
              />
            }
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {
              <Sidebar
                map={map}
                chatPreviews={previews}
                switchChat={switchChat}
                curChatId={chatId}
                createAppointment={createAppointment}
              />
            }
          </Drawer>
        </Box>
        {chatId && (
          <Box
            component="div"
            sx={{
              display: "flex",
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              flexGrow: 1,
              flexDirection: "column",
              ml: { sm: `${drawerWidth}px` },
              mt: { sm: `64px` },
              maxHeight: {
                sm: `calc(100% - 64px)`,
              },
            }}
          >
            <MainContainer
              style={{
                maxHeight: "100%",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <ChatContainer style={{ maxHeight: "100%", flexGrow: 1 }}>
                <MessageList style={{ flexGrow: 1 }}>
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
                                    ? // || chatContent.users.length === 2
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
                                    ? // || chatContent.users.length === 2
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
                </MessageList>
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
              </ChatContainer>
            </MainContainer>
          </Box>
        )}
      </Box>
    )
  );
}
