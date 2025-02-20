import { format } from "date-fns";
import overcastIcon from "./overcast.svg";
import partiallyCloudyIcon from "./partially_cloudy.svg";
import clearSkyeIcon from "./clear_sky_blue_clouds.svg";
import rainIcon from "./rain.svg";
import stormIcon from "./storm.svg";
import snowIcon from "./snow.svg";
let isCelsius = false; 
const switchTempBtn = document.querySelector(".switch-temp");
const switchHandler = () => {
  const allTemps = document.querySelectorAll(".temp");

  for (let currentTemp of allTemps) {
    let tempValue = parseFloat(currentTemp.textContent);

    if (isCelsius) {
      let fahrenheit = (tempValue * 9/5) + 32;
      currentTemp.textContent = `${fahrenheit.toFixed(1)} °F`;
    } else {
      let celsius = (tempValue - 32) * 5/9;
      currentTemp.textContent = `${celsius.toFixed(1)} °C`;
    }
  }

  switchTempBtn.textContent = isCelsius
    ? "Switch to Celsius"
    : "Switch to Fahrenheit";
    
  isCelsius = !isCelsius;
};

function switchBtn() {
  switchTempBtn.style.display = "block";

  switchTempBtn.removeEventListener("click", switchHandler);
  switchTempBtn.addEventListener("click", switchHandler);
}

function ScreenController(data) {
  const currentConditionBody = document.querySelector(".current-weather");
  const address = document.querySelector(".address");
  const date = document.querySelector(".date");
  const condition = document.querySelector(".condition-text");
  const imgTemp = document.querySelector(".condition-pic");
  const tempText = document.querySelector(".current-temp");
  const loadingText = document.querySelector(".loading");
  const sideBody = document.querySelector(".side-content");

  loadingText.style.display = "none";
  currentConditionBody.style.display = "block";
  sideBody.style.display = "block";
  address.textContent = data.address;
  date.textContent = format(new Date(), "eeee, P");
  condition.textContent = data.currentCondition;
  tempText.textContent = data.currentTemp + " °F";
  switchTempBtn.textContent = "Switch to Celsius";
  isCelsius = false;

  function imgIcon(condition, img) {
    const priorityOrder = [
      "storm",
      "rain",
      "snow",
      "clear",
      "overcast",
      "partially cloudy",
    ];
    const conditions = condition.toLowerCase().split(", ");
    img.style.display = "inline-block";
    let selectedCondition =
      conditions.find((cond) => {
        return priorityOrder.includes(cond);
      }) || "default";
    switch (selectedCondition) {
      case "snow":
        img.src = snowIcon;
        break;
      case "storm":
        img.src = stormIcon;
        break;
      case "rain":
        img.src = rainIcon;
        break;
      case "overcast":
        img.src = overcastIcon;
        break;
      case "partially cloudy":
        img.src = partiallyCloudyIcon;
        break;
      case "clear":
        img.src = clearSkyeIcon;
        break;
      default:
        img.style.display = "none";
    }
  }
  function sideContent() {
    sideBody.textContent = "";
    for (let i = 0; i < 6; i++) {
      const dayBody = document.createElement("div");
      const dayImg = document.createElement("img");
      const dayDate = document.createElement("div");
      const dayDate1 = document.createElement("div");
      const dayDate2 = document.createElement("div");
      const dayTemp = document.createElement("span");
      dayBody.classList.add("day-body");
      dayImg.classList.add("day-img");
      dayTemp.classList.add("day-temp");
      dayTemp.classList.add("temp");
      dayDate2.classList.add("day-date");
      imgIcon(data.days[i].conditions, dayImg);
      dayDate1.textContent = format(data.days[i].datetime, "EEEE");
      dayDate2.textContent = data.days[i].datetime;
      dayTemp.textContent = data.days[i].temp + " °F";
      dayDate.append(dayDate1, dayDate2);
      dayBody.append(dayImg, dayDate, dayTemp);
      sideBody.appendChild(dayBody);
    }
  }
  imgIcon(data.currentCondition, imgTemp);
  sideContent();
  switchBtn();
}
export { ScreenController };
