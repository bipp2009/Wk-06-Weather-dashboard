var APIKey = "9089f70eaa43a7727a45c93e56a716e3";

$("#search-weather").on("click", function () {
  console.log("Clicked");
  var city = $("#city-search-box").val()
  console.log(city);
});

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={9089f70eaa43a7727a45c93e56a716e}
