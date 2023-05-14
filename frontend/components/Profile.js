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
        <div className="profile-container"> {/* Added class name */}
          <Box alignItems="left" justifyContent="space-between">
            <div className="card-container"> {/* Added class name */}
              <Typography
                variant="h4"
                marginBottom={2}
                className="section-header"
                align="center"
              >
                Welcome back, {username}!
              </Typography>
            </div>

            {/* <div className="card-container">

            <Typography
              variant="h3"
              marginBottom={2}
              className="section-header"
              align="left"
            >

              {" "}
              Profile information
            </Typography>

            </div> */}

            <form onSubmit={handleSubmit}>
              
            <div className="profile-section-container">
              

              <div className="card-container3">

                <Typography
                  variant="h4"
                  marginBottom={2}
                  className="subsection-header"
                  align="left"
                >
                  {" "}
                  Personal Information
                </Typography>

                  <div className="survey" onChange={(event) => setDob(event.target.checked)}>
                    <div className="survey-row">
                    <label className="survey-q">Date of birth? &nbsp; </label>
                      <input type="date"  className="inputNumber" style={{ width: '100px' }}></input>
                    </div>
                  </div>

                  <div className="survey" onChange={(event) => setHeight(event.target.checked)}>
                    <div className="survey-row">
                    <label className="survey-q">Height (cm)? &nbsp; </label>
                      <input type="text"  className="inputNumber" style={{ width: '100px' }}></input>
                    </div>
                  </div>

                  <div className="survey" onChange={(event) => setWeight(event.target.checked)}>
                    <div className="survey-row">
                    <label className="survey-q">Weight (kg)? &nbsp; </label>
                      <input type="text"  className="inputNumber" style={{ width: '100px' }}></input>
                    </div>
                  </div>

                  <div className="survey" onChange={(event) => setGender(event.target.checked)}>
                    <div className="survey-row">
                    <label className="survey-q">Your sex (male or female)? &nbsp; </label>
                      <input type="text"  className="inputNumber" style={{ width: '100px' }}></input>
                    </div>
                  </div>

                  <div className="survey" onChange={(event) => setEthnicity(event.target.checked)}>
                    <div className="survey-row">
                    <label className="survey-q">Ethnicity (if multiple, list all)? &nbsp; </label>
                      <input type="text"  className="inputNumber" style={{ width: '100px' }}></input>
                    </div>
                  </div>

                </div>

                <div className="card-container3">
              

              <Typography
                variant="h4"
                marginBottom={2}
                className="subsection-header"
                align="left"

              >
                {" "}
                Lifestyle
              </Typography>

                
                <div className="survey" onChange={(event) => setDiet(event.target.checked)}>
                  <div className="survey-row">
                  <label className="survey-q">Briefly describe your diet (“omnivore”, “vegan”, etc…) &nbsp; </label>
                    <input type="number"  className="inputNumber2" style={{ width: '100px' }}></input>
                  </div>
                </div>


                <div className="survey" onChange={(event) => setExercise(event.target.checked)}>
                  <div className="survey-row">
                  <label className="survey-q">How often/for how long do you exercise (1-5) &nbsp; </label>
                    <input type="number"  className="inputNumber2" style={{ width: '100px' }}></input>
                  </div>
                </div>

                <div className="survey" onChange={(event) => setSleep(event.target.checked)}>
                  <div className="survey-row">
                  <label className="survey-q">How long do you regularly sleep per night? (hrs) &nbsp; </label>
                    <input type="number"  className="inputNumber2" style={{ width: '100px' }}></input>
                  </div>
                </div>

                <div className="survey" onChange={(event) => setAlcohol(event.target.checked)}>
                  <div className="survey-row">
                    <label className="survey-q">Are you a regular drinker?</label>
                    <input type="checkbox" className="checkbox"></input>
                  </div>
                </div>

                
                <div className="survey" onChange={(event) => setSmoke(event.target.checked)}>
                  <div className="survey-row">
                    <label className="survey-q">Have you smoked in the past two months?</label>
                    <input type="checkbox" className="checkbox"></input>
                  </div>
                </div>

                


              </div>

              </div>

              <div className="card-container">

              <Typography
                variant="h4"
                marginBottom={2}
                className="subsection-header"
                align="left"
              >
                {" "}
                Medical History
              </Typography>

              <div className="survey" onChange={(event) => setCurConditions(event.target.value)}>
                <div>
                  <label className="survey-q">Current medical conditions? &nbsp; </label>
                </div>
                <textarea rows="4" cols="50"></textarea>
              </div>

              <div className="survey" onChange={(event) => setPastConditions(event.target.value)}>
                <div>
                  <label className="survey-q">Previous medical conditions? &nbsp; </label>
                </div>
                <textarea rows="4" cols="50"></textarea>
              </div>

              <div className="survey" onChange={(event) => setMedications(event.target.value)}>
                <div>
                  <label className="survey-q">Medications (list any vitamins or supplememts you may be taking) &nbsp; </label>
                </div>
                <textarea rows="4" cols="50"></textarea>
              </div>

              <div className="survey" onChange={(event) => setSurgeries(event.target.value)}>
                <div>
                  <label className="survey-q">Surgeries or procedures &nbsp; </label>
                </div>
                <textarea rows="4" cols="50"></textarea>
              </div>

              <div className="survey" onChange={(event) => setAllergies(event.target.value)}>
                <div>
                  <label className="survey-q">Allergies? &nbsp; </label>
                </div>
                <textarea rows="4" cols="50"></textarea>
              </div>

              <div className="survey" onChange={(event) => setFamHistory(event.target.value)}>
                <div>
                  <label className="survey-q">Family medical conditions or history (such as diabetes) &nbsp; </label>
                </div>
                <textarea rows="4" cols="50"></textarea>
              </div>



              </div>


              

              

              <div>
                <button type="Submit Now">Submit!</button>
              </div>
              
              <Link to={{ pathname: "/chat", state: { dataArray: dataArray } }}>
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
