
var inputField = document.querySelector("input");
var searchButton = document.querySelector("#search-button");
var apiKey = "c24e52e168e5f1762f6e0f549f58fee4";
//coordinatesURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + "" + "&appid={API key}";

async function getCoordinates(cityName) {
    var coordinatesURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
    console.log(coordinatesURL);
    fetch(coordinatesURL, {
        method: 'GET', //GET is the default.
        })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            var cityData = data[0];
            
            //console.log(cityData.name,cityData.lat,cityData.lon);
            lat = cityData.lat;
            lon = cityData.lon;
            getCurrentWeather(lat,lon);
        })
        .catch(function(error) {
            console.log(error);
        });
    
}

async function getCurrentWeather(lat,lon) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon + "&units=imperial&appid=" + apiKey;
    var weatherToday = document.querySelector("#weather-today");
    console.log(weatherURL);
    fetch(weatherURL, {
        method: "GET",
    })
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var temp = data.main.temp;
        var wind = data.wind.speed;
        var humidity = data.main.humidity;
        // var uvIndex = 
        weatherTodayHeader = weatherToday.querySelector("h2");
        weatherTodayHeader.textContent = data.name;

        weatherTodayList = weatherToday.querySelector("ul");
        $(weatherTodayList).children()[0].textContent = "Temp: " + temp + "°F";
        $(weatherTodayList).children()[1].textContent = "Wind: " + wind + "MPH";
        $(weatherTodayList).children()[2].textContent = "Humidity: " + humidity + "%";
        

        return data;
    })
}





searchButton.addEventListener("click", function() {
    console.log(inputField.value);
    getCoordinates(inputField.value);

})