const axios = require("axios");
const { domElements, urls } = require("./helper_objects");

function displayErrors(error) {
  console.error("Error:", error);
  domElements.weather.textContent = "Error retrieving location.";
}

async function getCountryNameFromCode(code) {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    return response.data[0].name.common;
  } catch (error) {
    console.error("Error retrieving country name:", error);
    return code;
  }
}

async function retrieveNews(countryCode, country) {
  try {
    const newsResponse = await axios.get(urls.news(countryCode));
    const news = newsResponse.data.news
      .map(
        (article) => `
          <div class="news-item">
            <div class="news-info">
              <h3 class="news-title">${article.title}</h3>
              <p class="news-description">${article.description}</p>
              <a href="${article.url}" target="_blank">Read more</a>
            </div>
          </div>
        `
      )
      .join("");
    domElements.news.innerHTML = `
        <h3>${country}</h3>
        ${news}
      `;
  } catch (error) {
    console.error("Error retrieving news:", error);
    domElements.news.textContent = "Error retrieving news.";
  }
}

function displayWeather(response) {
  const weatherIconCode = response.data.weather[0].icon; // e.g., "04d"
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
  const weatherData = `
      <div class="weather-icon">
        <img src="${weatherIconUrl}" alt="${response.data.weather[0].description}">
      </div>
      <div class="weather-details">
        <h2>${response.data.name}</h2>
        <div class="temperature">${response.data.main.temp}°C</div>
        <div class="weather-description">${response.data.weather[0].description}</div>
      </div>
    `;
  domElements.weather.innerHTML = weatherData;
}

module.exports = {
  getCountryNameFromCode,
  displayErrors,
  displayWeather,
  retrieveNews,
};
