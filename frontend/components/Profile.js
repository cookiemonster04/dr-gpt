import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Profile.css";
import { Link } from "react-router-dom";
import { faM } from "@fortawesome/free-solid-svg-icons";

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
        <div className="profile-container"> 
          <Box alignItems="left" justifyContent="space-between">
            <div className="card-container"> 
              <Typography
                paddingTop="2.24rem"
                marginTop="4.2rem"
                variant="h4"
                marginBottom={1}
                className="dark:text-white"
                align="center"
              >
                Welcome back, {username}!
              </Typography>

              <p className="sm:w-4/5 md:w-3/5 dark:text-white mx-auto text-center text-lg">
                Start by filling out your profile. While no field is mandatory, the more information you provide, 
                the more likely it is that your diagnosis will be accurate.
              </p>
            </div>


            <div className="w-full sm:w-3/5 mx-auto pb-40 mt-20">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                <form onSubmit={handleSubmit}>
                  <div className="card-container">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {" "}
                        Personal Information
                    </h3>
        
                    <div>
                      <label for="date-of-birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth?</label>
                      <input 
                        type="date" 
                        name="date-of-birth" 
                        id="date-of-birth"
                        value={dob} 
                        onChange={(event) => setDob(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>

                    <div>
                      <label for="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height (cm)?</label>
                      <input 
                        type="number" 
                        name="height" 
                        id="height"
                        value={height} 
                        onChange={(event) => setHeight(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>

                    <div>
                      <label for="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight (kg)?</label>
                      <input 
                        type="number" 
                        name="weight" 
                        id="weight"
                        value={weight} 
                        onChange={(event) => setWeight(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>
                    
                    <div>
                      <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your sex (male or female)?</label>
                      <input 
                        type="text" 
                        name="gender" 
                        id="gender"
                        value={gender} 
                        onChange={(event) => setGender(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>

                    <div className="mb-4">
                      <label for="ethnicity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ethnicity (if multiple, list all)?</label>
                      <input 
                        type="text" 
                        name="ethnicity" 
                        id="ethnicity"
                        value={ethnicity} 
                        onChange={(event) => setEthnicity(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>

                    </div>

                    <div className="card-container">

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {" "}
                      Medical History
                    </h3>

                    <div className="sm:col-span-2 mb-6">
                      <label for="cur-conditions" clasName="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current medical conditions?</label>
                      <textarea 
                        id="cur-conditions" 
                        rows="4" 
                        value={curConditions}
                        onChange={(event) => setCurConditions(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder=""></textarea>                    
                    </div>

                    <div className="sm:col-span-2 mb-6">
                      <label for="past-conditions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Previous medical conditions?</label>
                      <textarea 
                        id="past-conditions" 
                        rows="4" 
                        value={pastConditions}
                        onChange={(event) => setPastConditions(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder=""></textarea>                    
                    </div>

                    <div className="sm:col-span-2 mb-6">
                      <label for="medications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medications (list any vitamins or supplememts you may be taking)</label>
                      <textarea 
                        id="medications" 
                        rows="4" 
                        value={medications}
                        onChange={(event) => setMedications(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder=""></textarea>                    
                    </div>

                    <div className="sm:col-span-2 mb-6">
                      <label for="surgeries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surgeries or procedures?</label>
                      <textarea 
                        id="surgeries" 
                        rows="4" 
                        value={surgeries}
                        onChange={(event) => setSurgeries(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder=""></textarea>                    
                    </div>

                    <div className="sm:col-span-2 mb-6">
                      <label for="allergies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allergies?</label>
                      <textarea 
                        id="allergies" 
                        rows="4" 
                        value={allergies}
                        onChange={(event) => setAllergies(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder=""></textarea>                    
                    </div>

                    <div className="sm:col-span-2 mb-6">
                      <label for="fam-history" clasName="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Family medical conditions or history (such as diabetes)</label>
                      <textarea 
                        id="fam-history" 
                        rows="4" 
                        value={famHistory}
                        onChange={(event) => setFamHistory(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder=""></textarea>                    
                    </div>

                    </div>

                    <div className="card-container">

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {" "}
                      Lifestyle
                    </h3>

                    <div className="sm:col-span-2 mb-6">
                      <label for="diet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Briefly describe your diet (“omnivore”, “vegan”, etc…)</label>
                      <textarea 
                        id="diet" 
                        rows="4" 
                        value={diet}
                        onChange={(event) => setDiet(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder=""></textarea>                    
                    </div>

                    <div>
                      <label for="exercise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How often/for how long do you exercise (1-5)</label>
                      <input 
                        type="number" 
                        name="exercise" 
                        id="exericse"
                        value={exercise} 
                        onChange={(event) => setExercise(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>

                    <div>
                      <label for="smoke" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Have you smoked in the last 2 months?</label>
                      <select 
                        name="smoke" 
                        id="smoke"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={smoke} 
                        onChange={(event) => setSmoke(event.target.value)}
                        >
                        <option selected="yes">No</option>
                        <option value="no">Yes</option>
                      </select>
                    </div>

                    <div>
                      <label for="smoke" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Have you consumed alcohol in the past 2 months?</label>
                      <select 
                        id="alcohol" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        name="alcohol" 
                        value={alcohol} 
                        onChange={(event) => setAlcohol(event.target.value)}
                        >
                        <option selected="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>

                    <div>
                      <label for="stress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rate your stress level in the last 14 days, where 1 is lowest and 5 is highest</label>
                      <input 
                        type="number" 
                        name="stress" 
                        id="stress"
                        value={stress} 
                        onChange={(event) => setStress(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>

                    <div>
                      <label for="sleep" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How long do you regularly sleep per night? (hrs)</label>
                      <input 
                        type="number" 
                        name="sleep" 
                        id="sleep"
                        value={sleep} 
                        onChange={(event) => setSleep(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="" 
                        required=""/>
                    </div>

                  </div>

                  <div>
                    <button 
                      type="Submit Now" 
                      className="text-gray-900 dark:text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm rem-0.36 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Save
                      </button>
                  </div>
                  
                  <Link to={{ pathname: "/chat", state: { dataArray: dataArray } }}>
                    <button className="text-gray-900 dark:text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm rem-0.36 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Go to Chat
                    </button>
                  </Link>
                </form>
            
              </div>
            </div>
            
          </Box>
        </div>
      </ThemeProvider>
    )
  );
};

export default Profile;
