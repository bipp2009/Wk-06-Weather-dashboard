var APIKey = "9089f70eaa43a7727a45c93e56a716e3";

$("#search-weather").on("click", function () {
 
  var city = $("#city-search-box").val()
 
  var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey ; 
  fetch(currentWeatherUrl).then(function(result) {
    return result.json();
  }).then(function(data){
    console.log(data)
    console.log("cityname:", data.name)
    console.log("longitude", data.coord.lon)
    //latitude
    console.log("latitude", data.coord.lat)
    //temp
    console.log("temperature", data.main.temp)

    //humidity
    console.log("humidity", data.main.humidity)
    //wind spped
    console.log("wind speed", data.wind.speed)
  })
  var futureWeatherURl = "https://api.openweathermap.org/data/2.5/onecall?q=" + latitude + longitude "&appid=" + API key"
  fetch(futureWeatherURl).then(function(result) {
    return result.json();
  }
  }).then(function(data{
    console.log(data)
console.log("UVIndex"),
  })
});

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={9089f70eaa43a7727a45c93e56a716e}
