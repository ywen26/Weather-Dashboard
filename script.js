// var cities = [];
var citiesEl = $("#cities-view");
var apiKey = "a9d9a4fb7b847a29b51b4fde79748585";
// var apiKey = "a9d9a4fb7b847a29b51b4fde79748585";
// var queryURL = "api.openweathermap.org/data/2.5/weather?q=Seattle&appid=" + apiKey;

// function renderCities() {
//     $("#cities-view").empty();
//     for (i = 0; i < cities.length; i++) {
//         var citiesEl = $("<p>").text(cities[i]);
//         $("#cities-view").append(citiesEl);
//     }
// }

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var inputEl = $("#city-input").val();
    var cityName = {city: inputEl};
    var cityList = localStorage.getItem("cityList");

    if (cityList === null) {
        cityList = [];
    } 
    else {
        cityList = JSON.parse(cityList);
    }

    cityList.push(cityName);

    var newAddCity = JSON.stringify(cityList);
    localStorage.setItem("cityList", newAddCity);
    // var inputEl = $("#city-input").val();
    var citiesEl2 = $("<p>").text(inputEl);
    $("#cities-view").prepend(citiesEl2);
    // renderCities();
    // location.reload();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl + "&appid=" + apiKey;

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var today = moment();
        $("#city").text(inputEl + today.format(" (MM/DD/YYYY)"));

        var imgURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        $("#weatherImg").attr("src", imgURL);

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temp").text("Temperature: " + tempF.toFixed(2) + " °F");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        
        var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + apiKey;

        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function(response2) {
            console.log(response2);
            $("#uvIndex").text("UV Index: " + response2.value);
        });
    });

    var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + inputEl + "&appid=" + apiKey;

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response3) {
        console.log(response3);
    });

    $("#city-input").val("");
});

// renderCities();

cityList = localStorage.getItem("cityList");
cityList = JSON.parse(cityList);

if (cityList !== null) {
    for (var i = 0; i < cityList.length; i++) {
        var cities = $("<p>");
        cities.text(cityList[i].city);
        citiesEl.prepend(cities);
    }
}

var clear = $("<button>");
$("#clear").append(clear);
clear.on("click", function() {
    localStorage.clear();
    location.reload();
});

// function currentWeather() {
//     var apiKey = "a9d9a4fb7b847a29b51b4fde79748585";
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl + "&appid=" + apiKey;

//     $.ajax({
//         url:queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//         $("#city").text(inputEl);
//         var tempF = (response.main.temp - 273.15) * 1.80 + 32;
//         $("#temp").text("Temperature: " + tempF);
//         $("#wind").text("Wind Speed: " + response.wind.speed + "MPH");
//         $("#humidity").text("Humidity: " + response.main.humidity + "%");
//     });
// }
