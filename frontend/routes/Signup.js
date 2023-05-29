import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Signup.css";
import { Typography } from "@mui/material";
import { NavLink, Navigate } from "react-router-dom";


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
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/user", {
        email: email,
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setIsError(false);
        // setUser(response.data.user);
        setMessage("Signup successful! A verification email was sent to your account. You can close this page.");
      })
      .catch(function (error) {
        if (error.response.message == "Network Error") {
          setIsError(true);
          setMessage("Something went wrong, please try again in a moment");
          return;
        }
        setIsError(true);
        setMessage(error.response.data);
      });
    // try {
    //   axios.post("api/login", {
    //     username: username,
    //     password: password,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <div class="min-h-screen">
      {/* {submitted && <Navigate to="/profile" />} */}
      <ThemeProvider theme={theme}>
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
            <input type="checkbox" className="mr-2">
            </input>

            
            <label>
              I have read and agree to Vitawise's <NavLink to="/terms" className="underline">Terms of Service</NavLink> and <NavLink to="/privacy" className="underline">Privacy Policy</NavLink>.
            </label>
            
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
