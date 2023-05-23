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
    <div className="min-h-screen flex">
    {/* <div id="Sidebar">
    <aside id="default-sidebar" class="fixed left-0 top-20 z-40 w-128 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
      <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ul class="space-y-2">
          <li>
            <button variant="contained" class="text-gray-800 dark:text-white inline-flex items-center bg-primary-700 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-100">
              New Appointment
            </button>
          </li>
        </ul>
      </div>
    </aside>
    </div> */}
    <div class="min-h-screen w-1/2">
      <Typography
        marginTop="75px"
        variant="h4"
        marginBottom={2}
      >
      </Typography>
      <div class="w-4/5 mx-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Add Symptom
            </h3>
          </div>

          <form onSubmit={handleData}>
            <div>
              {symptoms.map((symptom, index) => (
                <div key={index}>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {" "}
                    Symptom #{index + 1}
                  </h3>

                  <div>
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input 
                          type="text" 
                          name="title" 
                          id="title"
                          value={symptom.title}
                          onChange={(e) => handleChange(e, index, "title")}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                          placeholder="Type title of symptom" 
                          required=""/>
                      </div>
                      <div>
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                        <input 
                          type="text" 
                          name="duration" 
                          id="duration" 
                          value={symptom.duration}
                          onChange={(e) => handleChange(e, index, "duration")}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                          placeholder="Duration" 
                          required=""/>
                      </div>
                      <div>
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Severity</label>
                        <input 
                          type="number" 
                          name="severity" 
                          id="severity" 
                          value={symptom.severity}
                          onChange={(e) => handleChange(e, index, "severity")}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                          placeholder="Severity" 
                          required=""/>
                      </div>
                      <div class="mb-4">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label>
                        <input 
                          type="text" 
                          name="frequency" 
                          id="frequency" 
                          value={symptom.frequency}
                          onChange={(e) => handleChange(e, index, "frequency")}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                          placeholder="Frequency" 
                          required=""/>
                      </div>
                      <div class="sm:col-span-2 mb-6">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea 
                          id="description" 
                          rows="4" 
                          value={symptom.description}
                          onChange={(e) => handleChange(e, index, "description")}
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                          placeholder="Description"></textarea>                    
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button  
                type="button" 
                onClick={addSymptom}
                class="text-gray-800 dark:text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  Add another symptom
              </button>

              <br></br>
              <button onClick={handleData} class="text-gray-800 dark:text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Submit
              </button>

            </div>

            <br></br>
          </form>
          
        </div>
      </div>
      <div class="h-16"></div>
    </div>
    
    <div className="w-1/2">
      <Typography
        marginTop="75px"
        variant="h4"
        marginBottom={2}
      >
      </Typography>
      <div class="min-h-[600px] flex flex-col relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            New Conversation
          </h3>
        </div>

        <div className="mb-16">
          {messageHistory.map((message, index) => (
            <div key={index}>
              <p className="text-gray-900 dark:text-white">{message}</p>
              <br></br>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-5">
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <input
                type="text"
                placeholder="message of details"
                class="h-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex w-400 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:black-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            
              <button 
                type="submit"
                className="h-7 ml-2 flex w-full text-gray-800 dark:text-white items-center bg-primary-700 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-100"
              >
                Send Chat
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
    

    </div>
  );
};

export default Chat;