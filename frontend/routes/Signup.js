import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Signup.css";
import { Typography } from "@mui/material";

const Item = ({ name, type, formValue, setFormValue, placeholder }) => {
  return (
    <div className="inputContainer">
      <input
        className="input"
        id={`signup_${name}`}
        type={type}
        value={formValue}
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
        placeholder={placeholder}
      ></input>
      <label htmlFor={`signup_${name}`} className="label">
        {name.charAt(0).toUpperCase() + name.slice(1) + ":"}
      </label>
    </div>
  );
};

const Signup = ({ user, setUser, themeMode }) => {
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  if (user) {
    return <Navigate to="/profile" />;
  }
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [messages, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("/api/user", {
        email: email,
        username: username,
        password: password,
      })
      .then(
        (response) => {
          setIsError(false);
          // setUser(response.data.user);
          setSubmitted(true);
        },
        (error) => {
          if (error.response.message == "Network Error") {
            setIsError(true);
            setMessage("Something went wrong, please try again in a moment");
            return;
          }
          setIsError(true);
          setMessage(error.response.data);
        }
      );
    try {
      axios.post("api/login", {
        username: username,
        password: password,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div class="min-h-screen">
      <Typography>marginTop: 75px</Typography>
      {/* {submitted && <Navigate to="/profile" />} */}
      <ThemeProvider theme={theme}>
        {submitted && (
          <div className="bg-lime-400">
            Signup successful! A verification email was sent to your account.
          </div>
        )}
        <div className="signupFrm">
          <form className="form" onSubmit={handleSubmit}>
            <div className="title-container">
              <h1 className="title" style={{ color: "#333" }} class="mb-4">
                Sign up
              </h1>
              <FontAwesomeIcon
                icon={faUserPlus}
                size="lg"
                style={{ color: "#333" }}
              />
            </div>
            <Item
              name="email"
              type="text"
              formValue={email}
              setFormValue={setEmail}
              placeholder=""
            />
            <Item
              name="username"
              type="text"
              formValue={username}
              setFormValue={setUsername}
              placeholder=""
            />
            <Item
              name="password"
              type="password"
              formValue={password}
              setFormValue={setPassword}
              placeholder=""
            />
            <label
              htmlFor="signup_submit"
              className={isError ? "no-msg" : "yes-msg"}
            >
              {messages.split("\n").map((msg, idx) => {
                return <div key={`signup_msg_${idx}`}>{msg}</div>;
              })}
            </label>
            <input
              id="signup_submit"
              type="submit"
              className="submitBtn"
              value="Sign up"
            ></input>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Signup;
