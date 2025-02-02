const API_KEY = "bcac86a1b586a6ac745654cdfcbffd12"; 

// Digital Clock
function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Toggle Dark Mode
document.getElementById("toggleDarkMode").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});

// Fetch Weather by City Name
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Enter a city name");

    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
}

// Fetch Weather by User Location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
            },
            () => alert("Location access denied")
        );
    } else {
        alert("Geolocation is not supported");
    }
}

// Fetch and Display Weather
async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);

        document.getElementById("weatherResult").innerHTML = `
            <h2 class="text-xl font-bold">${data.name}, ${data.sys.country}</h2>
            <p class="text-lg">${data.weather[0].description}</p>
            <p class="text-2xl font-semibold">${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        alert("Error fetching weather: " + error.message);
    }
}
