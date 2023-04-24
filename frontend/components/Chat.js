import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageHistory, setHistory] = useState([]);
  const [symptom1, setSymptom1] = useState("");
  const [symptom2, setSymptom2] = useState("");
  const [symptom3, setSymptom3] = useState("");

  const handleData = (event) => {
    event.preventDefault();
    setHistory((curHistory) => [...curHistory, message]);
    axios
      .post("/api/message", {
        message: ("I'm going to give you a set of symptoms and I want you to attempt to give me a diagnosis with the percentage of confidence, You should aim for the highest confidence so when needed, ask followup questions to gather more information. Then I'm going to tell you if you were right or wrong. "
        + "symptom 1: " + symptom1 + ", sympton 2" + symptom2 + ", sympton 3" + symptom3)
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setHistory((curHistory) => [...curHistory, message]);
    axios
      .post("/api/message", {
        message: (symptom1 + ", " + symptom2 + ", " + symptom3 + ", "  + message)
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
    <form onSubmit={handleData}>
      <p>Symptom 1</p>
          <input type="text" placeholder="Symptom 1" value={symptom1} onChange={(event) => setSymptom1(event.target.value)} />
          <p>Symptom 2</p>
          <input type="text" placeholder="Symptom 2" value={symptom2} onChange={(event) => setSymptom2(event.target.value)} />
          <p>Symptom 3</p>
          <input type="text" placeholder="Symptom 3" value={symptom3} onChange={(event) => setSymptom3(event.target.value)} />
          <button type="submit">submit</button>
    </form>
      {messageHistory.map((message, index) => (
        <div key={index}>
          <p>{message}</p>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="message of details"
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
