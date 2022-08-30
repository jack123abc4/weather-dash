
var inputField = document.querySelector("input");
var searchButton = document.querySelector("#search-button");
var searchHistory = document.querySelector("#search-history");
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
        var today = moment();
        // var uvIndex = 
        weatherTodayHeader = weatherToday.querySelector("h2");
        weatherTodayHeader.textContent = data.name + " " + today.format("(L)");
        console.log(data.weather);
        console.log(data.weather[0]);
        console.log(data.weather[0].icon);
        console.log(weatherToday.querySelector("#weather-icon"));
        weatherToday.querySelector("#weather-icon").setAttribute("src", "http://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png")

        weatherTodayList = weatherToday.querySelector("ul");
        $(weatherTodayList).children()[0].textContent = "Temp: " + temp + "°F";
        $(weatherTodayList).children()[1].textContent = "Wind: " + wind + "MPH";
        $(weatherTodayList).children()[2].textContent = "Humidity: " + humidity + "%";
        getForecastedWeather(lat,lon);
        return data;
    })
    .catch(function(error) {
        console.log(error);
    });
}

async function getForecastedWeather(lat,lon) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon="+ lon + "&units=imperial&appid=" + apiKey;
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
        var forecastIndex = 0;
        var forecastSection = document.querySelector("#five-day-forecast");
        for (var i = 0; i < data.list.length; i++) {
            var forecast = data.list[i];
            var forecastDate = forecast.dt_txt.split(" ")[0];
            var forecastTime = forecast.dt_txt.split(" ")[1];
            console.log(forecastDate,forecastTime);
            if (forecastTime === "12:00:00") {
                var forecastCard = $(forecastSection).children()[forecastIndex];
                forecastCard.querySelector("h3").textContent = forecastDate;

                forecastCard.querySelector("#weather-icon").setAttribute("src", "http://openweathermap.org/img/wn/"+ forecast.weather[0].icon + "@2x.png")
                
                var forecastList = forecastCard.querySelector("ul");
                var temp = forecast.main.temp;
                var wind = forecast.wind.speed;
                var humidity = forecast.main.humidity;
                $(forecastList).children()[0].textContent = "Temp: " + temp + "°F";
                $(forecastList).children()[1].textContent = "Wind: " + wind + "MPH";
                $(forecastList).children()[2].textContent = "Humidity: " + humidity + "%";
                forecastIndex++;
            }
        }
        return data;
    })
    .catch(function(error) {
        console.log(error);
    });
}

function addToHistory(cityName) {
    var historyButton = document.createElement("button");
    historyButton.classList.add("btn", "btn-secondary","block", "col-12");
    historyButton.setAttribute("id", "history-button");
    historyButton.textContent = cityName;
    searchHistory.appendChild(historyButton);
}

searchButton.addEventListener("click", function() {
    console.log(inputField.value);
    
    getCoordinates(inputField.value);
    addToHistory(inputField.value);

})

searchHistory.addEventListener("click", function(event) {
    if (event.target.getAttribute("id") === "history-button") {
        console.log(event.target.textContent);
        getCoordinates(event.target.textContent);
    }
})