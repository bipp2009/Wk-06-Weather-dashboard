let APIKey = "9089f70eaa43a7727a45c93e56a716e3";

function getWeather(city, processData) {
  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  weatherData = fetch(currentWeatherUrl)
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      processData(data);
    });
}

function getForecast(lat, lon, processData) {
  var futureWeatherURl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
  weatherData = fetch(futureWeatherURl)
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      processData(data);
    });
}

let weatherData;

function showForecast(data) {
  console.log("showForecast", data);
}

function showWeatherData(data) {
  console.log("cityname:", data.name);

  //temp
  console.log("temperature", data.main.temp);

  //humidity
  console.log("humidity", data.main.humidity);
  //wind spped
  console.log("wind speed", data.wind.speed);

  getForecast(data.coord.lat, data.coord.lon, showForecast);
}

$(document).ready(function () {
  $("#search-weather").on("click", (e) => {
    let city = $("#city-search-box").val();
    getWeather(city, showWeatherData);
  });

  $("#show-long").on("click", (e) => {
    alert(weatherData.coord.lon);
  });
});
