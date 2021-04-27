let APIKey = "9089f70eaa43a7727a45c93e56a716e3";

//Two functions to get the current weather and the future forecast
function getWeather(city) {
  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
  weatherData = fetch(currentWeatherUrl)
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      showCurrent(data);
    });
}

function getForecast(lat, lon) {
  var futureWeatherURl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${APIKey}`;
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
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
  //Create element for city name
  var cityNameEl = document.createElement("h3");
  cityNameEl.textContent = data.name;
  //Create element for city temp
  var cityTempEl = document.createElement("p");
  cityTempEl.textContent = "Temp : " + data.main.temp;

  //Create element for city humidity
  console.log("humidity", data.main.humidity);
  var cityHumidityEl = document.createElement("p");
  cityHumidityEl.textContent = "Humidity: " + data.main.humidity;
  //Create element for city wind speed
  console.log("wind speed", data.wind.speed);
  var cityWindspeedEl = document.createElement("p");
  cityWindspeedEl.textContent = "Wind Speed: " + data.wind.speed;

  var currentWeatherArea = document.getElementById("current");
  currentWeatherArea.innerHTML = "";

  currentWeatherArea.appendChild(cityNameEl);
  currentWeatherArea.appendChild(cityTempEl);
  currentWeatherArea.appendChild(cityHumidityEl);
  currentWeatherArea.appendChild(cityWindspeedEl);
  getForecast(data.coord.lat, data.coord.lon);
}
function showForecast(data) {
  var uv = data.current.uvi;
  var currentWeatherArea = document.getElementById("current");
  var uvEl = document.createElement("p");
  uvEl.textContent = "UV Index: " + uv;
  currentWeatherArea.appendChild(uvEl);
  var futureWeatherArea = document.getElementById("future");

  futureWeatherArea.innerHTML = " ";

  var futureDailyWeather = data.daily;
  console.log(data);
  for (var i = 0; i < 5; i++) {
    var card = document.createElement("div");
    card.setAttribute("class", "col-2");
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + futureDailyWeather[i].temp.day;
    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + futureDailyWeather[i].humidity;
    let icon = futureDailyWeather[i].weather[0].icon;
    let imgEl = document.createElement("img");

    imgEl.src = ` http://openweathermap.org/img/wn/${icon}@2x.png`;
    card.appendChild(imgEl);

    BindClickEventToLi();
    card.appendChild(tempEl);
    card.appendChild(humidityEl);

    futureWeatherArea.appendChild(card);
  }
}
function BindClickEventToLi() {
  $(".history li")
    .off()
    .on("click", function (e) {
      e.preventDefault();
      let city = e.currentTarget.innerHTML;
      getWeather(city);
    });
}

function getWeatherCityHistoryList() {
  let weatherCityHistory = localStorage.getItem("weatherCityHistory");
  let list = [];
  if (weatherCityHistory) {
    list = weatherCityHistory.split(",");
  }
  return list;
}
//Function to run the application search and everything else
$(document).ready(function () {
  let list = getWeatherCityHistoryList();
  list.map((item) => $(".history").append(`<li>${item}</li>`));
  BindClickEventToLi();

  $("#search-weather").on("click", (e) => {
    let city = $("#city-search-box").val();
    getWeather(city);
    $(".history").append(`<li>${city}</li>`);

    list.push(city);
    localStorage.setItem("weatherCityHistory", list);
  });
});
