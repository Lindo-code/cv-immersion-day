const axios = require("axios");

const urls = {
  weather: (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`,
  news: (country) =>
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`,
};

document.addEventListener("DOMContentLoaded", () => {
  retrieveLocation();
});

function retrieveLocation() {
  navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(showPosition)
    : (document.getElementById("weather-data").textContent =
        "Geolocation is not supported by this browser.");
}

function showPosition(myPosition) {
  const latitude = myPosition.coords.latitude,
    longitude = myPosition.coords.longitude;
  retrieveData(latitude, longitude);
}

// HANDLE ERRORS
function displayErrors(error) {}

async function retrieveData(latitude, longitude) {
  const response = await axios.get(urls.weather(latitude, longitude));
  const countryCode = response.data.sys.country;
  const country = await getCountryNameFromCode(countryCode);
//   await retrieveNews(countryCode, country);
  displayWeather(response);
}

async function getCountryNameFromCode(code) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        return response.data[0].name.common;
    } catch (error) {
        console.error('Error retrieving country name:', error);
        return code;
    }
}

async function retrieveNews(countryCode, country) {
  const response = await axios.get(urls.news(countryCode));
  console.log(response.data.articles);
  const news = response.data.articles
    .map(
      (article) => `
        <article>
            <h3>${article.title}</h3>
            <a href="${article.url}" target="_blank">Read more</a>
        </article>
    `
    )
    .join("");
  document.getElementById("latest-news-main").innerHTML = `<h2>Latest News In ${country}</h2>`;
  document.getElementById("latest-news").innerHTML = news;
}

function displayWeather(response) {
  const weatherIconCode = response.data.weather[0].icon; // e.g., "04d"
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
  const weatherData = `
    <h2>${response.data.name}</h2>
    <img src="${weatherIconUrl}" alt="">
    <p>Temperature: ${response.data.main.temp}°C</p>
    <p>Weather: ${response.data.weather[0].description}</p>
`;
  document.getElementById("weather-data").innerHTML = weatherData;
}

module.exports = { urls };
