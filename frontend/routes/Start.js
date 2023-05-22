import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import "../public/styles.css";

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
    <div class="min-h-screen">
      <Typography
        marginTop="75px"
        variant="h4"
        marginBottom={2}
      >
      </Typography>
      <div class="w-3/5 mx-auto">
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
                  Add Symptom
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

      
    </div>
  );
};

export default Start;
