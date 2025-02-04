const API_KEY = "bcac86a1b586a6ac745654cdfcbffd12";

function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById("toggleDarkMode").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});

async function getWeather() {
    const location = document.getElementById("locationInput").value.trim();
    const lang = document.getElementById("languageSelect").value;
    if (!location) return alert("Enter a city or pincode");
    
    let url;
    if (!isNaN(location)) {
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&units=metric&appid=${API_KEY}&lang=${lang}`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}&lang=${lang}`;
    }
    fetchWeatherData(url, lang);
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const lang = document.getElementById("languageSelect").value;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=${lang}`;
                fetchWeatherData(url, lang);
            },
            () => alert("Location access denied")
        );
    } else {
        alert("Geolocation is not supported");
    }
}

async function fetchWeatherData(url, lang) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);

        document.getElementById("weatherResult").innerHTML = `
            <h2 class="text-xl font-bold">${data.name}, ${data.sys.country}</h2>
            <p class="text-lg">${data.weather[0].description}</p>
            <p class="text-2xl font-semibold">${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
            <p>Pincode: ${data.zip || 'N/A'}</p>
            <p>UV Index: Data Unavailable</p>
            <p>Air Quality Index: Data Unavailable</p>
        `;
        
        fetchForecast(data.coord.lat, data.coord.lon, lang);
    } catch (error) {
        alert("Error fetching weather: " + error.message);
    }
}

async function fetchForecast(lat, lon, lang) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=${lang}`);
        const data = await response.json();
        
        let forecastHTML = "";
        for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            forecastHTML += `
                <div class="p-2 bg-gray-200 dark:bg-gray-700 rounded text-center">
                    <p class="font-bold">${new Date(forecast.dt_txt).toLocaleDateString()}</p>
                    <p>${forecast.weather[0].description}</p>
                    <p class="text-lg">${forecast.main.temp}°C</p>
                </div>
            `;
        }
        document.getElementById("forecastResult").innerHTML = forecastHTML;
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}