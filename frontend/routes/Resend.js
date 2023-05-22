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
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/send", {
        email: email,
      })
      .then(function (response) {
        console.log(response);
        setSubmitted(true);
      })
      .catch(function (error) {
        setSubmitted(true);
        console.log(error);
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
        {submitted && (
          <div className="bg-lime-400">
            If there is an unverified account associated with {email}, a new verification email has been sent.
          </div>
        )}
        <div className="signupFrm">
          <form className="form" onSubmit={handleSubmit}>
            <div className="title-container">
              <h1 className="title" style={{ color: "#333" }} class="mb-4">
                Resend Verification
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
            <input
              id="signup_submit"
              type="submit"
              className="submitBtn"
              value="Submit"
            ></input>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Signup;
