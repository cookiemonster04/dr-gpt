import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dataArray } from './Profile';
import {
  Typography,
  Box,
} from "@mui/material";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageHistory, setHistory] = useState([]);
  const [symptoms, setSymptoms] = useState([{ title: "", duration: "", severity: "", frequency: "", description: "" }]);

  const addSymptom = () => {
    setSymptoms([...symptoms, { title: "", duration: "", severity: "", frequency: "", description: "" }]);
  };

  const handleChange = (e, index, type) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index][type] = e.target.value;
    setSymptoms(newSymptoms);
  };

  /*const location = useLocation();
  const dataArray = location.state?.dataArray;*/

  const handleData = (event) => {
    event.preventDefault();
    setHistory((curHistory) => [...curHistory, message]);

    const concatenatedString = symptoms
    .map((symptom, index) => {
      const { title, duration, severity, frequency, description } = symptom;
      return `symptom ${index + 1}: title: ${title}, duration: ${duration}, severity (1-10): ${severity}, frequency: ${frequency}, description: ${description}`;
    })
    .join(", ");

    axios
      .post("/api/message", {
        message: ("I'm going to give you a set of symptoms and I want you to attempt to give me a diagnosis with the percentage of confidence, You should aim for the highest confidence so when needed, ask followup questions to gather more information. Then I'm going to tell you if you were right or wrong. "
        /* + "Before giving you the symptoms, here is the medical history of the patient: " 
        + "DOB: " + dataArray[0] 
        + ", Height: " + dataArray[1] 
        + "cm, Weight: " + dataArray[2] 
        + "kg, Gender: " + dataArray[3] 
        + ", Ethnicity: " + dataArray[4] 
        + ". Current medical conditions: " + dataArray[5] 
        + ", Previous medical conditions: " + dataArray[6]
        + ", Medications: " + dataArray[7] 
        + ", Surgeries or procedures: " + dataArray[8]
        + ", Allergies: " + dataArray[9]
        + ", Family medical history: " + dataArray[10]
        + ". Diet: " + dataArray[11] 
        + ", Exercise (1-5): " + dataArray[12] 
        + ", Smoker: " + dataArray[13] 
        + ", Alcohol consumption: " + dataArray[14]
        + ", Stress level (1-5): " + dataArray[15]
        + ", Sleep: " + dataArray[16] + "hours/night." */
        
        + concatenatedString
        )
      })
      .then(
        (response) => {
          setHistory((curHistory) => [...curHistory, response.data]);
          console.log("Message sent success:", response.data);
          console.log(concatenatedString);
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
        message: (message)
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
    <div>
      <form onSubmit={handleData}>

      <div>
        {symptoms.map((symptom, index) => (
          <div key={index}>

            <Typography
              variant="h5"
              marginBottom={2}
              className="subsection-header"
              align="left"
            >
              {" "}
              Symptom #{index + 1}
            </Typography>
            <label>
              Title
              <br></br>
              <input
                type="text"
                value={symptom.title}
                onChange={(e) => handleChange(e, index, "title")}
              />
              <br></br>
            </label>
            <label>
              Duration
              <br></br>
              <input
                type="text"
                value={symptom.duration}
                onChange={(e) => handleChange(e, index, "duration")}
              />
              <br></br>
            </label>
            <label>
              Severity (1-10)
              <br></br>
              <input
                type="number"
                value={symptom.severity}
                onChange={(e) => handleChange(e, index, "severity")}
              />
              <br></br>
            </label>
            <label>
              Frequency
              <br></br>
              <input
                type="text"
                value={symptom.frequency}
                onChange={(e) => handleChange(e, index, "frequency")}
              />
              <br></br>
            </label>
            <label>
              Description
              <br></br>
              <input
                type="text"
                value={symptom.description}
                onChange={(e) => handleChange(e, index, "description")}
              />
              <br></br>
              <br></br>
            </label>
          </div>
          ))}

        <button type="button" onClick={addSymptom}>Add Symptom</button>
        <br></br>
        <button onClick={handleData}>Submit</button>
      </div>

        <br></br>
      </form>

        {messageHistory.map((message, index) => (
          <div key={index}>
            <p style={{ maxWidth: "350px"}}>{message}</p>
          </div>
        ))}

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="message of details"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            
            <button type="submit">Send Chat</button>
            </div>
          </form>
        </div>

      </div>
    </>
  );
};

export default Chat;