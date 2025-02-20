import { ScreenController } from "./UI.js";
const getWeatherData = async function (url) {
  try {
    console.log("Fetching URL:", url); 
  const data = await fetch(url, { mode: "cors" });
  const json = await data.json();
  console.log(json);
  return json;
  } catch(err){
    alert("Failed to fetch weather data. Please write a valid location and try again.");
    console.log(err);
    return null;
  }
};
const processData = async function (json) {
  const processedData = {
    address: json.resolvedAddress,
    currentCondition: json.currentConditions.conditions,
    currentTemp: json.currentConditions.temp,
    days: json.days,
  };
  return await processedData;
};
const updateUrl = function (location) {
  const loadingText = document.querySelector(".loading");
  const currentWeather = document.querySelector(".current-weather");
  const sideContent = document.querySelector(".side-content");
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=V4EYQE6TRYU7DJAPMU5DETK2Y`;
  loadingText.style.display = "block";
  currentWeather.style.display = "none";
  sideContent.style.display = "none"
  getWeatherData(url)
    .then((json) => {
      if (!json) {  
        throw new Error("Failed to fetch weather data.");
      }
      return processData(json);
    })
    .then((respond) => {
      console.log(respond);
      ScreenController(respond);
    })
    .catch((err) => {
      console.error("Error in updateUrl:", err.message);
    })
    .finally(() => {
      loadingText.style.display = "none";  
    });
};
const updateButton = () => {
  const updateBtn = document.getElementById("update-btn");
  const searchInp = document.getElementById("location-input");
  const buttonHandler = (e) => {
    if (!searchInp.value.trim())
        return;
    e.preventDefault();
    updateUrl(searchInp.value);
  };
  updateBtn.addEventListener("click", buttonHandler);
};
export { updateButton, processData };
