import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = ({ userId, user, themeMode }) => {
  const [username, setUsername] = useState("");
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const [dob, setDob] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [curConditions, setCurConditions] = useState("");
  const [pastConditions, setPastConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [surgeries, setSurgeries] = useState("");
  const [allergies, setAllergies] = useState("");
  const [famHistory, setFamHistory] = useState("");
  const [diet, setDiet] = useState("");
  const [exercise, setExercise] = useState(0);
  const [smoke, setSmoke] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [stress, setStress] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [dataArray, setDataArray] = useState([]);



  //get user info
  useEffect(() => {
    async function getInfo() {
      if (!userId) {
        setUsername(user.username);
      } else {
        const userInfo = await axios.get(`/api/user/${userId}`);
        if (userInfo.hasOwnProperty("data")) {
          setUsername(userInfo.data.username);
        }
      }
    }
    getInfo();
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setDob(dob);
    setHeight(height);
    setWeight(weight);
    setGender(gender);
    setEthnicity(ethnicity);
    setCurConditions(curConditions);
    setPastConditions(pastConditions);
    setMedications(medications);
    setSurgeries(surgeries);
    setAllergies(allergies);
    setFamHistory(famHistory);
    setDiet(diet);
    setExercise(exercise);
    setSmoke(smoke);
    setAlcohol(alcohol);
    setStress(stress);
    setSleep(sleep);

    setDataArray([dob, height, weight, gender, ethnicity, curConditions, pastConditions, medications, surgeries, allergies, famHistory, diet, exercise, smoke, alcohol, stress, sleep]);
    
    /*
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
    */

    console.log("==submitted==");

    /*
    console.log(dob);
    console.log(height);
    console.log(weight);
    console.log(gender);
    console.log(ethnicity);
    console.log(curConditions);
    console.log(pastConditions);
    console.log(medications);
    console.log(surgeries);
    console.log(allergies);
    console.log(famHistory);
    console.log(diet);
    console.log(exercise);
    console.log(smoke);
    console.log(alcohol);
    console.log(stress);
    console.log(sleep);
    */ 
  };

  useEffect(() => {
    for (let i = 0; i < dataArray.length; i++) {
      console.log(dataArray[i]);
    }
  }, [dataArray]);
  return (
    username && (
      <ThemeProvider theme={theme}>
        <div className={"profile-container"}>
          <Box alignItems="center" justifyContent="space-between">
            <Typography
              variant="h4"
              marginBottom={2}
              className="section-header"
              align="center"
            >
              {" "}
              Welcome back, {username}
            </Typography>

            <Typography
              variant="h3"
              marginBottom={2}
              className="section-header"
              align="left"
            >
              {" "}
              Profile information
            </Typography>

            <form onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                marginBottom={2}
                className="subsection-header"
                align="left"
              >
                {" "}
                Medical History
              </Typography>

              <div className="survey" value={dob} onChange={(event) => setDob(event.target.value)}>
                <label className="survey-q">What is your date of birth? &nbsp; </label>
                <input type="date"></input>
              </div>
              
              <div className="survey" value={height} onChange={(event) => setHeight(event.target.value)}>
                <label className="survey-q">How tall are you (cm)? &nbsp; </label>
                <input type="number"></input>
              </div>

              <div className="survey" value={weight} onChange={(event) => setWeight(event.target.value)}>
                <label className="survey-q">What is your weight (kg)? &nbsp; </label>
                <input type="number"></input>
              </div>

              <div className="survey" value={gender} onChange={(event) => setGender(event.target.value)}>
                <label className="survey-q">What is your gender? &nbsp; </label>
                <input type="text"></input>
              </div>

              <div className="survey" onChange={(event) => setEthnicity(event.target.value)}>
                <label className="survey-q">What is your ethnicity? &nbsp; </label>
                <input type="text"></input>
              </div>

              <h4>Please list any that apply:</h4>

              <div className="survey" onChange={(event) => setCurConditions(event.target.value)}>
                <div>
                  <label className="survey-q">Current medical conditions? &nbsp; </label>
                </div>
                <textarea></textarea>
              </div>

              <div className="survey" onChange={(event) => setPastConditions(event.target.value)}>
                <div>
                  <label className="survey-q">Previous medical conditions &nbsp; </label>
                </div>
                <textarea></textarea>
              </div>

              <div className="survey" onChange={(event) => setMedications(event.target.value)}>
                <div>
                  <label className="survey-q">Medications &nbsp; </label>
                </div>
                <textarea></textarea>
              </div>

              <div className="survey" onChange={(event) => setSurgeries(event.target.value)}>
                <div>
                  <label className="survey-q">Surgeries or procedures &nbsp; </label>
                </div>
                <textarea></textarea>
              </div>

              <div className="survey" onChange={(event) => setAllergies(event.target.value)}>
                <div>
                  <label className="survey-q">Allergies &nbsp; </label>
                </div>
                <textarea></textarea>
              </div>

              <div className="survey" onChange={(event) => setFamHistory(event.target.value)}>
                <div>
                  <label className="survey-q">Family medical conditions or history &nbsp; </label>
                </div>
                <textarea></textarea>
              </div>

              <Typography
                variant="h4"
                marginBottom={2}
                className="subsection-header"
                align="left"
              >
                {" "}
                Lifestyle
              </Typography>

              <div className="survey" onChange={(event) => setDiet(event.target.value)}>
                <label className="survey-q">Briefly describe your diet (“omnivore”, “vegan”, etc…) &nbsp; </label>
                <input type="text"></input>
              </div>

              <div className="survey" onChange={(event) => setExercise(event.target.value)}>
                <label className="survey-q">How often/for how long do you exercise (1-5) &nbsp; </label>
                <input type="number"></input>
              </div>

              <div className="survey" onChange={(event) => setSmoke(event.target.checked)}>
                <label className="survey-q">Have you smoked in the last 2 months? &nbsp; </label>
                <input type="checkbox"></input>
              </div>

              <div className="survey" onChange={(event) => setAlcohol(event.target.checked)}>
                <label className="survey-q">Have you consumed Alcohol in the past 2 months? &nbsp; </label>
                <input type="checkbox"></input>
              </div>

              <div className="survey" onChange={(event) => setStress(event.target.value)}>
                <label className="survey-q">Rate your stress level in the last 14 days (1-5) &nbsp; </label>
                <input type="number"></input>
              </div>

              <div className="survey" onChange={(event) => setSleep(event.target.value)}>
                <label className="survey-q">How long do you sleep per night? (hrs) &nbsp; </label>
                <input type="number"></input>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
              
              <Link to="/chat">
                <button>Go to Chat</button>
              </Link>
            </form>
            
          </Box>
        </div>
      </ThemeProvider>
    )
  );
};

export default Profile;
