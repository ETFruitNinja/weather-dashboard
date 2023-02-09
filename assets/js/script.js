var searchBtn = document.getElementById("search-btn");

function getWeatherData(event) {
    // prevents page from refreshing
    event.preventDefault();

    // requesting coordinates from the searched city
    var requestCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q=Seattle,WA,USA&limit=1&appid=8ec6c4af786e285879d4dc34ae0bacd2";

    fetch(requestCoordinates)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // setting longitude and latitude values of city used to obtain city's weather forecast
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            // TODO: call function to convert coordinates to forecast
            convertCoordinatesToForecast(latitude, longitude);
        })
}

function convertCoordinatesToForecast(latitude, longitude) {
    // requesting 5-day forecast from the searched city based on retrived coordinates
    // TODO: fix lon/lat so data is not undefined
    var requestForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=8ec6c4af786e285879d4dc34ae0bacd2";

    // fetch request to get forecast data
    fetch(requestForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

searchBtn.addEventListener("click", function(event) {
    getWeatherData(event);
});

// clicking cities from search history: based on target (event.target)