import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Profile.css";

const Profile = ({ userId, user, themeMode }) => {
  const [username, setUsername] = useState("");
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  //get user info
  useEffect(() => {
    async function getInfo() {
      if (!userId) {
        setUsername(user.username);
      } else {
        const userInfo = await axios.get(`/api/user/${userId}`);
        if (userInfo.hasOwnProperty("data")) {
          setUsername(userInfo.data.username);
        }
      }
    }
    getInfo();
  }, [userId]);
  return (
    username && (
      <ThemeProvider theme={theme}>
        <div className={"profile-container"}>
          <Box alignItems="center" justifyContent="space-between">
            <Typography
              variant="h3"
              marginBottom={2}
              className="section-header"
              align="center"
            >
              {" "}
              Welcome back, {username}
            </Typography>
          </Box>
        </div>
      </ThemeProvider>
    )
  );
};

export default Profile;
