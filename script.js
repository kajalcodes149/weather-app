const API_KEY = "227eb471d5c84ea1871185729261611";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);


// Function to fetch weather data

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    const message = document.getElementById("message");

    const weatherInfo = document.getElementById("weatherInfo");

    // Check empty input

    if (city === "") {

        message.innerText = "Please enter a city name.";

        return;
    }

    try {

        message.innerText = "Loading weather data...";

        // API URL

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

        // Fetch API data

        const response = await fetch(url);

        const data = await response.json();

        // Check API errors

        if (!response.ok) {

            throw new Error(data.error.message);
        }

        // Extract weather information

        const location = data.location.name;

        const country = data.location.country;

        const temperature = data.current.temp_c;

        const condition = data.current.condition.text;

        const icon = data.current.condition.icon;

        const feelsLike = data.current.feelslike_c;

        const humidity = data.current.humidity;

        const windSpeed = data.current.wind_kph;

        const localTime = data.location.localtime;


        // Display information

        document.getElementById("cityName").innerText =
            `${location}, ${country}`;

        document.getElementById("temperature").innerText =
            `${temperature}°C`;

        document.getElementById("condition").innerText =
            condition;

        document.getElementById("weatherIcon").src =
            "https:" + icon;

        document.getElementById("feelsLike").innerText =
            `${feelsLike}°C`;

        document.getElementById("humidity").innerText =
            `${humidity}%`;

        document.getElementById("windSpeed").innerText =
            `${windSpeed} km/h`;

        document.getElementById("date").innerText =
            `Local Time: ${localTime}`;

        message.innerText = "";

        weatherInfo.style.display = "block";

    }

    catch (error) {

        message.innerText = error.message;

    }

}


// Search when user presses Enter

document.getElementById("cityInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        getWeather();

    }

});


// Load default city when website opens

window.addEventListener("load", function() {

    document.getElementById("cityInput").value = "London";

    getWeather();

});