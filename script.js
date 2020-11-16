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
    var citiesEl2 = $("<p>");
    citiesEl2.text(inputEl);
    citiesEl2.addClass("cityRecord");
    $("#cities-view").prepend(citiesEl2);
    searchHistory();
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl + "&appid=" + apiKey;

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var today = moment();
        $("#city").text(inputEl + today.format(" (MM/DD/YYYY)"));

        var imgURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        $("#weatherImg").attr("src", imgURL);

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temp").text("Temperature: " + tempF.toFixed(2) + " °F");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + apiKey;

        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function(response2) {
            console.log(response2);
            $("#uvIndex").text("UV Index: " + response2.value);
            var uvValue = parseInt(response2.value);
            uvIndicator(uvValue);
        });
    });

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl + "&appid=" + apiKey;

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response3) {
        console.log(response3);

        $("#fiveDays").text("5-Day forecast:");

        $("#day1").empty();
        var date1 = response3.list[1].dt_txt.split(" ")[0];
        $("#day1").append($("<p>").text(date1));
        var imgDate1 = "http://openweathermap.org/img/wn/" + response3.list[1].weather[0].icon + "@2x.png";
        $("#day1").append($("<img>").attr("src", imgDate1));
        var tempDate1 = (response3.list[1].main.temp - 273.15) * 1.80 + 32;
        $("#day1").append($("<p>").text("Temp: " + tempDate1.toFixed(2) + " °F"));
        $("#day1").append($("<p>").text("Humidity: " + response3.list[1].main.humidity + "%"));

        $("#day2").empty();
        var date2 = response3.list[9].dt_txt.split(" ")[0];
        $("#day2").append($("<p>").text(date2));
        var imgDate2 = "http://openweathermap.org/img/wn/" + response3.list[9].weather[0].icon + "@2x.png";
        $("#day2").append($("<img>").attr("src", imgDate2));
        var tempDate2 = (response3.list[9].main.temp - 273.15) * 1.80 + 32;
        $("#day2").append($("<p>").text("Temp: " + tempDate2.toFixed(2) + " °F"));
        $("#day2").append($("<p>").text("Humidity: " + response3.list[9].main.humidity + "%"));

        $("#day3").empty();
        var date3 = response3.list[17].dt_txt.split(" ")[0];
        $("#day3").append($("<p>").text(date3));
        var imgDate3 = "http://openweathermap.org/img/wn/" + response3.list[17].weather[0].icon + "@2x.png";
        $("#day3").append($("<img>").attr("src", imgDate3));
        var tempDate3 = (response3.list[17].main.temp - 273.15) * 1.80 + 32;
        $("#day3").append($("<p>").text("Temp: " + tempDate3.toFixed(2) + " °F"));
        $("#day3").append($("<p>").text("Humidity: " + response3.list[17].main.humidity + "%"));

        $("#day4").empty();
        var date4 = response3.list[25].dt_txt.split(" ")[0];
        $("#day4").append($("<p>").text(date4));
        var imgDate4 = "http://openweathermap.org/img/wn/" + response3.list[25].weather[0].icon + "@2x.png";
        $("#day4").append($("<img>").attr("src", imgDate4));
        var tempDate4 = (response3.list[25].main.temp - 273.15) * 1.80 + 32;
        $("#day4").append($("<p>").text("Temp: " + tempDate4.toFixed(2) + " °F"));
        $("#day4").append($("<p>").text("Humidity: " + response3.list[25].main.humidity + "%"));

        $("#day5").empty();
        var date5 = response3.list[33].dt_txt.split(" ")[0];
        $("#day5").append($("<p>").text(date5));
        var imgDate5 = "http://openweathermap.org/img/wn/" + response3.list[33].weather[0].icon + "@2x.png";
        $("#day5").append($("<img>").attr("src", imgDate5));
        var tempDate5 = (response3.list[33].main.temp - 273.15) * 1.80 + 32;
        $("#day5").append($("<p>").text("Temp: " + tempDate5.toFixed(2) + " °F"));
        $("#day5").append($("<p>").text("Humidity: " + response3.list[33].main.humidity + "%"));
    });

    $("#city-input").val("");
});

cityList = localStorage.getItem("cityList");
cityList = JSON.parse(cityList);

if (cityList !== null) {
    for (var i = 0; i < cityList.length; i++) {
        var cities = $("<p>");
        cities.text(cityList[i].city);
        cities.addClass("cityRecord");
        citiesEl.prepend(cities);
    }
}

function searchHistory() {
    $(".cityRecord").on("click", function(event) {
        event.preventDefault();
        var inputEl = $(this).text();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl + "&appid=" + apiKey;

        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var today = moment();
            $("#city").text(inputEl + today.format(" (MM/DD/YYYY)"));

            var imgURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            $("#weatherImg").attr("src", imgURL);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#temp").text("Temperature: " + tempF.toFixed(2) + " °F");
            $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            
            var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + apiKey;

            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function(response2) {
                console.log(response2);

                $("#uvIndex").text("UV Index: " + response2.value);
                var uvValue = parseInt(response2.value);
                uvIndicator(uvValue);
            });
        });

        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl + "&appid=" + apiKey;

        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(response3) {
            console.log(response3);

            $("#fiveDays").text("5-Day forecast:");

            $("#day1").empty();
            var date1 = response3.list[1].dt_txt.split(" ")[0];
            $("#day1").append($("<p>").text(date1));
            var imgDate1 = "http://openweathermap.org/img/wn/" + response3.list[1].weather[0].icon + "@2x.png";
            $("#day1").append($("<img>").attr("src", imgDate1));
            var tempDate1 = (response3.list[1].main.temp - 273.15) * 1.80 + 32;
            $("#day1").append($("<p>").text("Temp: " + tempDate1.toFixed(2) + " °F"));
            $("#day1").append($("<p>").text("Humidity: " + response3.list[1].main.humidity + "%"));

            $("#day2").empty();
            var date2 = response3.list[9].dt_txt.split(" ")[0];
            $("#day2").append($("<p>").text(date2));
            var imgDate2 = "http://openweathermap.org/img/wn/" + response3.list[9].weather[0].icon + "@2x.png";
            $("#day2").append($("<img>").attr("src", imgDate2));
            var tempDate2 = (response3.list[9].main.temp - 273.15) * 1.80 + 32;
            $("#day2").append($("<p>").text("Temp: " + tempDate2.toFixed(2) + " °F"));
            $("#day2").append($("<p>").text("Humidity: " + response3.list[9].main.humidity + "%"));

            $("#day3").empty();
            var date3 = response3.list[17].dt_txt.split(" ")[0];
            $("#day3").append($("<p>").text(date3));
            var imgDate3 = "http://openweathermap.org/img/wn/" + response3.list[17].weather[0].icon + "@2x.png";
            $("#day3").append($("<img>").attr("src", imgDate3));
            var tempDate3 = (response3.list[17].main.temp - 273.15) * 1.80 + 32;
            $("#day3").append($("<p>").text("Temp: " + tempDate3.toFixed(2) + " °F"));
            $("#day3").append($("<p>").text("Humidity: " + response3.list[17].main.humidity + "%"));

            $("#day4").empty();
            var date4 = response3.list[25].dt_txt.split(" ")[0];
            $("#day4").append($("<p>").text(date4));
            var imgDate4 = "http://openweathermap.org/img/wn/" + response3.list[25].weather[0].icon + "@2x.png";
            $("#day4").append($("<img>").attr("src", imgDate4));
            var tempDate4 = (response3.list[25].main.temp - 273.15) * 1.80 + 32;
            $("#day4").append($("<p>").text("Temp: " + tempDate4.toFixed(2) + " °F"));
            $("#day4").append($("<p>").text("Humidity: " + response3.list[25].main.humidity + "%"));

            $("#day5").empty();
            var date5 = response3.list[33].dt_txt.split(" ")[0];
            $("#day5").append($("<p>").text(date5));
            var imgDate5 = "http://openweathermap.org/img/wn/" + response3.list[33].weather[0].icon + "@2x.png";
            $("#day5").append($("<img>").attr("src", imgDate5));
            var tempDate5 = (response3.list[33].main.temp - 273.15) * 1.80 + 32;
            $("#day5").append($("<p>").text("Temp: " + tempDate5.toFixed(2) + " °F"));
            $("#day5").append($("<p>").text("Humidity: " + response3.list[33].main.humidity + "%"));
        });
    })
}

function uvIndicator(uvValue) {
    if (uvValue < 3) {
        $("#uvIndex").css("background-color", "green");
    }

    else if (uvValue >= 3 && uvValue < 5) {
        $("#uvIndex").css("background-color", "rgba(255, 217, 0, 0.918)");
    }

    else if (uvValue >= 5 && uvValue < 7) {
        $("#uvIndex").css("background-color", "orange");
    }

    else if (uvValue >= 7 && uvValue < 10) {
        $("#uvIndex").css("background-color", "red");
    }

    else if (uvValue >= 10) {
        $("#uvIndex").css("background-color", "purple");
    }
}

searchHistory();

var clear = $("<button>");
$("#clear").append(clear);
clear.on("click", function() {
    localStorage.clear();
    location.reload();
});
