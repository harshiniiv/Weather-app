const apiKey = "8a056b6e6936f002b2186cb87e3c4b93";

// Search Weather

async function getWeather() {

    const city =
      document.getElementById("city").value;

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

// Current Location Weather

function getLocationWeather() {

    navigator.geolocation.getCurrentPosition(
        async(position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url =
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetchWeather(url);
    });
}

// Fetch Weather Data

async function fetchWeather(url) {

    try {

        const response = await fetch(url);

        const data = await response.json();

        updateUI(data);

    } catch(error) {

        alert("Error fetching weather");
    }
}

// Update UI

function updateUI(data) {

    document.getElementById("cityName").innerText =
      data.name;

    document.getElementById("temperature").innerText =
      `${Math.round(data.main.temp)}°C`;

    document.getElementById("description").innerText =
      data.weather[0].description;

    document.getElementById("humidity").innerText =
      `${data.main.humidity}%`;

    document.getElementById("wind").innerText =
      `${data.wind.speed} km/h`;

    setWeatherIcon(data.weather[0].main);
}

// Weather Icons

function setWeatherIcon(weather) {

    const icon =
      document.getElementById("weatherIcon");

    switch(weather) {

        case "Clear":
            icon.innerHTML =
              '<i class="fas fa-sun"></i>';
            break;

        case "Clouds":
            icon.innerHTML =
              '<i class="fas fa-cloud"></i>';
            break;

        case "Rain":
            icon.innerHTML =
              '<i class="fas fa-cloud-rain"></i>';
            break;

        case "Snow":
            icon.innerHTML =
              '<i class="fas fa-snowflake"></i>';
            break;

        case "Thunderstorm":
            icon.innerHTML =
              '<i class="fas fa-bolt"></i>';
            break;

        default:
            icon.innerHTML =
              '<i class="fas fa-smog"></i>';
    }
}

// Dark Mode

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");
}