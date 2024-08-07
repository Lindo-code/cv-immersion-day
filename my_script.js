const axios = require("axios");
const WEATHER_API_KEY = "af8b8440182a240e16c7a1987b286f5f";
const NEWS_API_KEY = "f05b7df383f445b5be99a40b0f379b58";

const urls = {
    weather: (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
    news: (country) => `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${NEWS_API_KEY}`
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
   retrieveData(latitude, longitude);
}

// HANDLE ERRORS
function displayErrors(error) {
   
}

// RETRIEVE WEATHER DATA FROM API
async function retrieveData(latitude, longitude) {
   const response = await axios.get(urls.weather(latitude, longitude));
   await retrieveNews(response.data.sys.country);
   console.log(response.data.sys.country);
}

// RETIEVE NEWS FROM API
async function retrieveNews(country) {
    const response = await axios.get(urls.news(country));
    const news = response.data.articles.map(article => `
        <article>
            <h3>${article.title}</h3>
            <a href="${article.url}" target="_blank">Read more</a>
        </article>
    `).join('');
    // console.log(news)
    document.getElementById('latest-news').innerHTML = news;
}