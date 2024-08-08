const urls = {
  weather: (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`,
  news: (country) =>
    `https://api.currentsapi.services/v1/latest-news?country=${country}&apiKey=${process.env.NEWS_API_KEY}`,
};

const domElements = {
  weather: document.querySelector(".weather-info"),
  news: document.querySelector(".news-items"),
};

module.exports = {
  domElements,
  urls,
};
