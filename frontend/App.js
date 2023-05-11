import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import { ProfilePage, ProfileHome } from "./routes/ProfilePage";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Chat from "./routes/Chat";
import Start from "./routes/Start";
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
      {cookieRetrieved ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar
                  getTheme={theme}
                  handleTheme={toggleTheme}
                  user={user}
                />
                <div className="container">
                  <Home user={user} />
                </div>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar
                  getTheme={theme}
                  handleTheme={toggleTheme}
                  user={user}
                />{" "}
                <Signup user={user} setUser={setUser} />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar
                  getTheme={theme}
                  handleTheme={toggleTheme}
                  user={user}
                />{" "}
                <ProfileHome user={user} themeMode={theme} />
              </>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <>
                <Navbar
                  getTheme={theme}
                  handleTheme={toggleTheme}
                  user={user}
                />{" "}
                <ProfilePage themeMode={theme} user={user} />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar
                  getTheme={theme}
                  handleTheme={toggleTheme}
                  user={user}
                />{" "}
                <Login user={user} setUser={setUser} />
              </>
            }
          />
          <Route
            path="/logout"
            element={
              <>
                <Navbar
                  getTheme={theme}
                  handleTheme={toggleTheme}
                  user={user}
                />{" "}
                <Logout setUser={setUser} />
              </>
            }
          />
          {/* <Route
              path="/edit"
              element={
                <>
                  <Navbar
                    getTheme={theme}
                    handleTheme={toggleTheme}
                    user={user}
                  />{" "}
                  <EditPage user={user} setUser={setUser} />
                </>
              }
            /> */}
          <Route path="/chat" element={<Chat user={user} />} />
          <Route path="/chat/:chatId" element={<Chat user={user} />} />
          <Route path="/start" element={<Start user={user} />} />
        </Routes>
      ) : (
        <div className="container">Loading, please stand by...</div>
      )}
    </div>
  );
}

export default App;
