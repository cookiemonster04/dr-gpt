import React, { useState, cloneElement } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dataArray } from "./Profile";
import { Typography, Box, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageHistory, setHistory] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  const FormItem = (title, name, comp, symptom, setSymptom) => (
    <div
      className="survey"
      onChange={(event) =>
        setSymptom({ ...symptom, [name]: event.target.value })
      }
    >
      <label className="survey-q">{title} &nbsp; </label>
      {comp}
    </div>
  );

  /*const location = useLocation();
  const dataArray = location.state?.dataArray;*/

  const handleData = (event) => {
    event.preventDefault();
    setHistory((curHistory) => [...curHistory, message]);
    axios
      .post("/api/message", {
        message:
          "I'm going to give you a set of symptoms and I want you to attempt to give me a diagnosis with the percentage of confidence, You should aim for the highest confidence so when needed, ask followup questions to gather more information. Then I'm going to tell you if you were right or wrong. " +
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

          "symptom 1: " +
          symptom1 +
          ", duration: " +
          duration1 +
          ", severity (1-10): " +
          severity1 +
          ", frequency: " +
          frequency1 +
          ", description" +
          description1 +
          ", symptom 2: " +
          symptom2 +
          ", duration: " +
          duration2 +
          ", severity (1-10): " +
          severity2 +
          ", frequency: " +
          frequency2 +
          ", description" +
          description2 +
          ", symptom 3: " +
          symptom3 +
          ", duration: " +
          duration3 +
          ", severity (1-10): " +
          severity3 +
          ", frequency: " +
          frequency3 +
          ", description" +
          description3,
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
        message: symptom1 + ", " + symptom2 + ", " + symptom3 + ", " + message,
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
  const symptom_attrs = [
    ["Title", "title", <input type="text"></input>],
    ["Duration", "time", <input type="text"></input>],
    ["Severity (1-10)", "sev", <input type="number"></input>],
    ["Frequency", "freq", <input type="text"></input>],
    ["Description", "desc", <textarea></textarea>],
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ marginTop: "15px" }}>
        <form onSubmit={handleData} style={{ marginBottom: "15px" }}>
          {symptoms.map((symptom, idx) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    maxWidth: "500px",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <Typography
                    variant="h5"
                    marginBottom={2}
                    className="subsection-header"
                    align="left"
                    key={`symptom_${idx}`}
                  >
                    {" "}
                    Symptom {idx + 1}:
                  </Typography>
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#dc2626", cursor: "pointer" }}
                    size="lg"
                    onClick={() =>
                      setSymptoms([
                        ...symptoms.slice(0, idx),
                        ...symptoms.slice(idx + 1),
                      ])
                    }
                  >
                    {" "}
                  </FontAwesomeIcon>
                </div>
                {symptom_attrs.map((item, idx) => {
                  return FormItem(
                    item[0],
                    item[1],
                    React.cloneElement(item[2], { value: symptom[item] }),
                    symptoms[idx],
                    (symptom) =>
                      setSymptoms([
                        ...symptoms.slice(0, idx),
                        symptom,
                        symptoms.slice(idx + 1),
                      ])
                  );
                })}
              </>
            );
          })}
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setSymptoms([
                ...symptoms,
                symptom_attrs.reduce((obj, item) => {
                  return {
                    ...obj,
                    [item[0]]: "",
                  };
                }, {}),
              ])
            }
          >
            + symptom
          </Button>
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
                style={{ marginBottom: "10px" }}
              />

              <button type="submit">Send Chat</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
