import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import "./Start.css";

const Start = () => {
  const [symptoms, setSymptoms] = useState([
    { title: "", duration: "", severity: "", frequency: "", description: "" },
  ]);

  const addSymptom = () => {
    setSymptoms([
      ...symptoms,
      { title: "", duration: "", severity: "", frequency: "", description: "" },
    ]);
  };

  const handleChange = (e, index, type) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index][type] = e.target.value;
    setSymptoms(newSymptoms);
  };

  /*const location = useLocation();
  const dataArray = location.state?.dataArray;*/
  const navigate = useNavigate();
  const handleData = async (event) => {
    event.preventDefault();
    const resp = await axios.post("/api/message", { formData: symptoms });
    navigate(`/chat/${resp.data.chatId}`);
  };

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

            <button type="button" onClick={addSymptom}>
              Add Symptom
            </button>
            <br></br>
            <button onClick={handleData}>Submit</button>
          </div>

          <br></br>
        </form>
      </div>
    </>
  );
};

export default Start;
