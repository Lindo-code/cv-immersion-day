const axios = require("axios");
const urls = {
    weather: (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    news: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
}
document.addEventListener('DOMContentLoaded', () => {
    retrieveLocation()
});

// USE TO GET LOCATION
function retrieveLocation() {
    (navigator.geolocation) ? navigator.geolocation.getCurrentPosition(showPosition) : document.getElementById('weather-data').textContent = "Geolocation is not supported by this browser.";
}

// USE TO DISPLAY POSITION
function showPosition(myPosition) {
   const latitude = myPosition.coords.latitude, longitude = myPosition.coords.longitude;
   retrieveWeather(latitude, longitude);
   retrieveNews();
}

// HANDLE ERRORS
function displayErrors(error) {
   
}

// RETRIEVE WEATHER DATA FROM API
async function retrieveWeather(latitude, longitude) {
   const response = await axios.get(urls.weather(latitude, longitude));
   console.log(response.data);
}

// RETIEVE NEWS FROM API
function retrieveNews() {
   
}