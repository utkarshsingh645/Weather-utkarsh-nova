async function getWeather() {

    let city = document.getElementById("city").value;

    if (city == "") {
        alert("Enter city name");
        return;
    }

    // City ki location find karna
    let locationURL =
        "https://geocoding-api.open-meteo.com/v1/search?name="
        + city +
        "&count=1&language=en&format=json";

    let locationResponse = await fetch(locationURL);
    let locationData = await locationResponse.json();

    if (!locationData.results) {
        document.getElementById("result").innerHTML =
            "City not found ";
        return;
    }

    let place = locationData.results[0];

    let latitude = place.latitude;
    let longitude = place.longitude;

    // Weather data lena
    let weatherURL =
        "https://api.open-meteo.com/v1/forecast?latitude="
        + latitude
        + "&longitude="
        + longitude
        + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";

    let weatherResponse = await fetch(weatherURL);
    let weatherData = await weatherResponse.json();

    let weather = weatherData.current;

    document.getElementById("result").innerHTML =

        "<h2>" + place.name + "</h2>" +

        "<h1>🌡️ " +
        weather.temperature_2m +
        "°C</h1>" +

        "<p>💧 Humidity: " +
        weather.relative_humidity_2m +
        "%</p>" +

        "<p>💨 Wind Speed: " +
        weather.wind_speed_10m +
        " km/h</p>" +

        "<p>☁️ Weather Code: " +
        weather.weather_code +
        "</p>";
}
// Default city: Delhi
document.getElementById("city").value = "Bareilly";
getWeather();

// type enter and weather a jyega
document.getElementById("city").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
