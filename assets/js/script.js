var searchBtn = document.getElementById("search-btn");

function getWeatherData() {
    var requestCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q=Seattle,WA,USA&limit=1&appid=8ec6c4af786e285879d4dc34ae0bacd2";
    // var requestForecast = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=8ec6c4af786e285879d4dc34ae0bacd2";
    fetch(requestCoordinates)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

searchBtn.addEventListener("click", function() {
    getWeatherData();
});

// clicking cities from search history: based on target (event.target)