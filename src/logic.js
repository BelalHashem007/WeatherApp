const getWeatherData = async function (url) {
  const data = await fetch(url, { mode: "cors" });
  const json = await data.json();
  console.log(json);
  return json;
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
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=V4EYQE6TRYU7DJAPMU5DETK2Y`;
  getWeatherData(url)
    .then((json) => processData(json))
    .then((respond) => {
      console.log(respond);
    });
};
const updateButton = () => {
  const updateBtn = document.getElementById("update-btn");
  const searchInp = document.getElementById("location-input");
  const buttonHandler = (e) => {
    e.preventDefault();
    updateUrl(searchInp.value);
  };
  updateBtn.addEventListener("click", buttonHandler);
};
export { updateButton };
