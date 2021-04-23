let APIKey = "9089f70eaa43a7727a45c93e56a716e3";


//Two functions to get the current weather and the future forecast
function getWeather(city) {
  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  weatherData = fetch(currentWeatherUrl)
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      showCurrent(data);
    });
}

function getForecast(lat, lon) {
  var futureWeatherURl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metricfuture `;
  weatherData = fetch(futureWeatherURl)
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      showForecast(data);
    });
}


//Two functions to display the current weather and the future forecast on the screen
function showCurrent(data) {
  console.log("cityname:", data.name);
  //temp
  console.log("temperature", data.main.temp);
  //humidity
  console.log("humidity", data.main.humidity);
  //wind spped
  console.log("wind speed", data.wind.speed);

  getForecast(data.coord.lat, data.coord.lon);
}
function showForecast(data) {
  console.log("showForecast", data);
}

//Function to run the application search and everything else
$(document).ready(function () {
  $("#search-weather").on("click", (e) => {
    let city = $("#city-search-box").val();
    getWeather(city);
  });
 
});
