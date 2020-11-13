// var cities = [];
var citiesEl = $("#cities-view");

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
    // var citiesEl = $("<p>").text(inputEl);
    // $("#cities-view").prepend(citiesEl);
    // renderCities();
    location.reload();
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
$("#info").append(clear);
clear.on("click", function() {
    localStorage.clear();
    location.reload();
})





