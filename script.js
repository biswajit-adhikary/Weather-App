// --- Get references to HTML elements ---
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.querySelector(".weather-info");

// --- API Configuration ---
const apiUrl = "/weather"; // Changed to our proxy server endpoint

// --- Global Variables ---
let timeUpdateInterval; // To hold the interval ID for the clock

// --- Event Listeners ---
searchBtn.addEventListener("click", () =>
  getWeatherData({ city: cityInput.value })
);
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeatherData({ city: cityInput.value });
  }
});

// Fetch weather by location on page load
document.addEventListener("DOMContentLoaded", getWeatherByLocation);

// --- Functions ---

/**
 * Fetches weather data from our proxy server.
 * Can fetch by city name or by coordinates.
 * @param {object} options - An object containing either `city` (string) or `lat` (number) and `lon` (number).
 */
async function getWeatherData(options) {
  let url;

  if (options.city) {
    const city = options.city.trim();
    if (city === "") {
      weatherInfo.innerHTML = `<p class="error-message">Please enter a city name.</p>`;
      return;
    }
    url = `${apiUrl}?q=${city}`;
  } else if (options.lat && options.lon) {
    url = `${apiUrl}?lat=${options.lat}&lon=${options.lon}`;
  } else {
    weatherInfo.innerHTML = `<p class="error-message">Invalid request for weather data.</p>`;
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      displayWeatherData(data);
    } else {
      throw new Error(data.message || "City not found");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherInfo.innerHTML = `<p class="error-message">${error.message}</p>`;
  }
}

/**
 * Attempts to get the user's current geographical location
 * and then fetches weather data for that location.
 */
function getWeatherByLocation() {
  if (navigator.geolocation) {
    weatherInfo.innerHTML = `<p>Getting your location...</p>`;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        await getWeatherData({ lat, lon });
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please allow location access or search for a city.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        }
        weatherInfo.innerHTML = `<p class="error-message">${errorMessage}</p>`;
      }
    );
  } else {
    weatherInfo.innerHTML = `<p class="error-message">Geolocation is not supported by your browser. Please search for a city.</p>`;
  }
}

/**
 * Displays the fetched weather data on the page.
 * @param {object} data - The weather data object from the API.
 */
function displayWeatherData(data) {
  console.log(data);
  const { name, main, weather, wind, timezone } = data;
  const temperature = main.temp;
  const feelsLike = main.feels_like;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = weather[0].description;
  const icon = weather[0].icon;

  const weatherHtml = `
        <h2>City: ${name}</h2>
        <div id="city-time" class="city-time"></div>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="temperature">${temperature.toFixed(1)}°C</p>
        <p class="description">${description}</p>
        <div class="details">
            <div>
                <p class="label">Feels Like</p>
                <p class="value">${feelsLike.toFixed(1)}°C</p>
            </div>
            <div>
                <p class="label">Humidity</p>
                <p class="value">${humidity}%</p>
            </div>
            <div>
                <p class="label">Wind</p>
                <p class="value">${windSpeed.toFixed(1)} m/s</p>
            </div>
        </div>
    `;

  weatherInfo.innerHTML = weatherHtml;

  // --- Live Clock ---
  clearInterval(timeUpdateInterval); // Clear previous timer
  updateCityTime(timezone); // Initial call
  timeUpdateInterval = setInterval(() => updateCityTime(timezone), 1000); // Update every second
}

/**
 * Calculates and displays the current time for the city.
 * @param {number} timezoneOffset - The city's timezone offset from UTC in seconds.
 */
function updateCityTime(timezoneOffset) {
  const timeElement = document.getElementById("city-time");
  if (!timeElement) return;

  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const cityTime = new Date(utcTime + timezoneOffset * 1000);

  const timeString = cityTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  timeElement.textContent = `Current Time: ${timeString}`;
}
