const axios = require("axios");
const { domElements, urls } = require("./helpers/helper_objects");
const {
  getCountryNameFromCode,
  displayErrors,
  displayWeather,
  retrieveNews,
} = require("./helpers/helper_functions");

document.addEventListener("DOMContentLoaded", () => {
  retrieveLocation();
});

function retrieveLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, displayErrors);
  } else {
    domElements.weather.textContent =
      "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  retrieveData(latitude, longitude);
}

async function retrieveData(latitude, longitude) {
  try {
    const weatherResponse = await axios.get(urls.weather(latitude, longitude));
    const countryCode = weatherResponse.data.sys.country;
    const country = await getCountryNameFromCode(countryCode);
    await retrieveNews(countryCode, country);
    displayWeather(weatherResponse);
  } catch (error) {
    console.error("Error retrieving data:", error);
    domElements.weather.textContent = "Error retrieving weather data.";
  }
}
