import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dataArray } from './Profile';
import {
  Typography,
  Box,
} from "@mui/material";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageHistory, setHistory] = useState([]);
  const [symptom1, setSymptom1] = useState("");
  const [symptom2, setSymptom2] = useState("");
  const [symptom3, setSymptom3] = useState("");
  const [duration1, setDuration1] = useState("");
  const [duration2, setDuration2] = useState("");
  const [duration3, setDuration3] = useState("");
  const [severity1, setSeverity1] = useState(0);
  const [severity2, setSeverity2] = useState(0);
  const [severity3, setSeverity3] = useState(0);
  const [frequency1, setFrequency1] = useState("");
  const [frequency2, setFrequency2] = useState("");
  const [frequency3, setFrequency3] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  


  /*const location = useLocation();
  const dataArray = location.state?.dataArray;*/

  const handleData = (event) => {
    event.preventDefault();
    setHistory((curHistory) => [...curHistory, message]);
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
        
        + "symptom 1: " + symptom1 + ", duration: " + duration1 + ", severity (1-10): " + severity1 + ", frequency: " + frequency1 + ", description" + description1 
        + ", sympton 2: " + symptom2 + ", duration: " + duration2 + ", severity (1-10): " + severity2 + ", frequency: " + frequency2 + ", description" + description2 
        + ", sympton 3: " + symptom3 + ", duration: " + duration3 + ", severity (1-10): " + severity3 + ", frequency: " + frequency3 + ", description" + description3
        )
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

    <Typography
      variant="h5"
      marginBottom={2}
      className="subsection-header"
      align="left"
    >
      {" "}
      Symptom #1
    </Typography>

      <div className="survey" onChange={(event) => setSymptom1(event.target.value)}>
        <label className="survey-q">Title &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setDuration1(event.target.value)}>
        <label className="survey-q">Duration &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setSeverity1(event.target.value)}>
        <label className="survey-q">Severity (1-10) &nbsp; </label>
        <input type="number"></input>
      </div>
      <div className="survey" onChange={(event) => setFrequency1(event.target.value)}>
        <label className="survey-q">Frequency &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setDescription1(event.target.value)}>
        <label className="survey-q">Description &nbsp; </label>
        <textarea></textarea>
      </div>

    <Typography
      variant="h5"
      marginBottom={2}
      className="subsection-header"
      align="left"
    >
      {" "}
      Symptom #2
    </Typography>

      <div className="survey" onChange={(event) => setSymptom2(event.target.value)}>
        <label className="survey-q">Title &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setDuration2(event.target.value)}>
        <label className="survey-q">Duration &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setSeverity2(event.target.value)}>
        <label className="survey-q">Severity (1-10) &nbsp; </label>
        <input type="number"></input>
      </div>
      <div className="survey" onChange={(event) => setFrequency2(event.target.value)}>
        <label className="survey-q">Frequency &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setDescription2(event.target.value)}>
        <label className="survey-q">Description &nbsp; </label>
        <textarea></textarea>
      </div>

    <Typography
      variant="h5"
      marginBottom={2}
      className="subsection-header"
      align="left"
    >
      {" "}
      Symptom #3
    </Typography>

      <div className="survey" onChange={(event) => setSymptom3(event.target.value)}>
        <label className="survey-q">Title &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setDuration3(event.target.value)}>
        <label className="survey-q">Duration &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setSeverity3(event.target.value)}>
        <label className="survey-q">Severity (1-10) &nbsp; </label>
        <input type="number"></input>
      </div>
      <div className="survey" onChange={(event) => setFrequency3(event.target.value)}>
        <label className="survey-q">Frequency &nbsp; </label>
        <input type="text"></input>
      </div>
      <div className="survey" onChange={(event) => setDescription3(event.target.value)}>
        <label className="survey-q">Description &nbsp; </label>
        <textarea></textarea>
      </div>
      
      <div>
        <button type="submit">submit</button>
      </div>
      <br></br>
    </form>
      {messageHistory.map((message, index) => (
        <div key={index}>
          <p>{message}</p>
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
    </>
  );
};

export default Chat;
