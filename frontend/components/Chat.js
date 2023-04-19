import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageHistory, setHistory] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setHistory((curHistory) => [...curHistory, message]);
    axios
      .post("/api/message", {
        message: message,
      })
      .then(
        (response) => {
          setHistory((curHistory) => [...curHistory, response.data]);
          console.log("Message sent success:", response.data);
        },
        (error) => {
          console.error("Message send fail:", error);
        }
      );

    console.log("==message sent==");
    setMessage("");

    for (let i = 0; i < messageHistory.length; i++) {
      console.log(messageHistory[i]);
    }
  };

  return (
    <>
      {messageHistory.map((message, index) => (
        <div key={index}>
          <p>{message}</p>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default Chat;
