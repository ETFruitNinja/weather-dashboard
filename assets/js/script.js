var searchBtn = document.getElementById("search-btn");
var searchBar = document.getElementById("search-bar");
var todayCard = document.getElementById("today");
var forecastCards = document.getElementById("forecast");
var searchHistoryElement = document.getElementById("search-history");

var searchHistory = localStorage.getItem("history");
searchHistory = JSON.parse(searchHistory) || [];
for (var previousCity = 0; previousCity < searchHistory.length; previousCity++) {
    var previousCityBtn = document.createElement("button");
    searchHistoryElement.append(previousCityBtn);
    previousCityBtn.textContent = searchHistory[previousCity];
}

function getWeatherData(event) {
    // prevents page from refreshing
    event.preventDefault();
    // store the searched city in a variable
    var city = searchBar.value;

    // requesting coordinates from the searched city
    var requestCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=8ec6c4af786e285879d4dc34ae0bacd2";

    fetch(requestCoordinates)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // setting longitude and latitude values of city used to obtain city's weather forecast
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            convertCoordinatesToForecast(latitude, longitude);
        })
}

function convertCoordinatesToForecast(latitude, longitude) {
    // requesting current weather data from the searche dcity based on retrieved coordinates
    var requestCurrentWeatherData = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude +  "&lon=" + longitude + "&appid=8ec6c4af786e285879d4dc34ae0bacd2&units=imperial";
    // requesting 5-day forecast from the searched city based on retrived coordinates
    var requestForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=8ec6c4af786e285879d4dc34ae0bacd2&units=imperial";

    // fetch request to get today's weather data
    fetch(requestCurrentWeatherData)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // updates current weather card based on current weather data
            todayCard.getElementsByClassName("card-title")[0].innerHTML = data.name + " (" + dayjs.unix(data.dt).format("MM/DD/YYYY") + ")";
            todayCard.getElementsByClassName("temperature")[0].innerHTML = "Temperature: " + data.main.temp + "\u00B0F";
            todayCard.getElementsByClassName("wind")[0].innerHTML = "Wind: " + data.wind.speed + " MPH";
            todayCard.getElementsByClassName("humidity")[0].innerHTML = "Humidity: " + data.main.humidity + "%";

            // store the city in the search history (local storage)
            // searchHistory = localStorage.getItem("history");
            // searchHistory = JSON.parse(searchHistory) || [];
            if (!searchHistory.includes(data.name)) {
                searchHistory.push(data.name);
                localStorage.setItem("history", JSON.stringify(searchHistory));
                var previousCityBtn = document.createElement("button");
                searchHistoryElement.append(previousCityBtn);
                previousCityBtn.textContent = data.name;
            }
            // to clear local storage while testing:
            // localStorage.setItem("history", JSON.stringify([]));
        })

    // fetch request to get forecast data
    fetch(requestForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // updates forecast cards based on forecasted weather data for the next 5 days
            for (var i = 1; i < data.list.length / 8 + 1; i++) {
                forecastCards.getElementsByClassName("card-date")[i - 1].innerHTML = dayjs.unix(data.list[i * 8 - 1].dt).format("MM/DD/YYYY");
                forecastCards.getElementsByClassName("temperature")[i - 1].innerHTML = "Temperature: " + data.list[i * 8 - 1].main.temp + "\u00B0F";
                forecastCards.getElementsByClassName("wind")[i - 1].innerHTML = "Wind: " + data.list[i * 8 - 1].wind.speed + " MPH";
                forecastCards.getElementsByClassName("humidity")[i - 1].innerHTML = "Humidity: " + data.list[i * 8 - 1].main.humidity + "%";
            }
        })
}

searchBtn.addEventListener("click", function(event) {
    getWeatherData(event);
});

// clicking cities from search history: based on target (event.target)