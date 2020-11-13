var cities = [];

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
    var citiesEl = $("<p>").text(inputEl);
    $("#cities-view").prepend(citiesEl);
    // renderCities();
})

// renderCities();