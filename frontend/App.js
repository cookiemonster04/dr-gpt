import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import { ProfilePage, ProfileHome } from "./routes/ProfilePage";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import { ChatPage } from "./routes/ChatPage";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [cookieRetrieved, setCookieRetrieved] = useState(false);

  const solveCookie = () => {
    axios
      .get("/api/user")
      .then(
        (ret) => {
          setUser(ret.data);
        },
        (err) => console.log(err)
      )
      .finally(() => setCookieRetrieved(true));
  };
  useEffect(() => {
    solveCookie();
  }, []);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
      <Navbar getTheme={theme} handleTheme={toggleTheme} user={user} />
      {cookieRetrieved ? (
        <div className="container">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/signup"
              element={<Signup user={user} setUser={setUser} />}
            />
            <Route
              path="/profile"
              element={<ProfileHome user={user} themeMode={theme} />}
            />
            <Route
              path="/profile/:userId"
              element={<ProfilePage themeMode={theme} />}
            />
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route path="/logout" element={<Logout setUser={setUser} />} />
            <Route path="/chat" element={<ChatPage user={user} themeMode={theme} />} />
          </Routes>
        </div>
      ) : (
        <div className="container">Loading, please stand by...</div>
      )}
    </div>
  );
}

export default App;
