const apikey = "5891e2c701d25c0ef22753933ce25226";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const mainContent = document.querySelector(".main-content");
const errorDiv = document.querySelector(".error");
const loadingDiv = document.querySelector(".loading");
const forecastSection = document.querySelector(".forecast-section");
const forecastContainer = document.querySelector(".forecast-container");
let currentForecastPage = 0;
let forecastItems = [];

// Set initial city when page loads
window.addEventListener("load", () => {
    // Try to get last searched city from localStorage
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        searchBox.value = lastCity;
        checkWeather(lastCity);
    } else {
        // Default city
        checkWeather("New York");
    }
});

async function checkWeather(city) {
    try {
        // Show loading spinner and hide other elements
        loadingDiv.style.display = "flex";
        mainContent.style.display = "none";
        errorDiv.style.display = "none";

        // Fetch current weather data
        const response = await fetch(weatherApiUrl + city + `&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        
        // Update current weather UI
        updateWeatherUI(data);
        
        // Fetch and update forecast data
        await getForecast(city);
        
        // Save city to localStorage
        localStorage.setItem("lastCity", city);
        
        // Update last updated time
        updateLastUpdatedTime();

        // Show main content
        mainContent.style.display = "flex";
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorDiv.style.display = "block";
        mainContent.style.display = "none";
    } finally {
        loadingDiv.style.display = "none";
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
    document.querySelector(".weather-description").innerHTML = data.weather[0].description;
    document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".min-max").innerHTML = Math.round(data.main.temp_min) + "°C / " + Math.round(data.main.temp_max) + "°C";
    
    // Convert sunrise and sunset times
    const sunriseTime = formatTime(data.sys.sunrise * 1000);
    const sunsetTime = formatTime(data.sys.sunset * 1000);
    document.querySelector(".sunrise").innerHTML = sunriseTime;
    document.querySelector(".sunset").innerHTML = sunsetTime;

    // Set weather icon based on weather condition
    setWeatherIcon(data.weather[0].main);
    
    // Show weather data
    weatherDiv.style.display = "block";
}

function setWeatherIcon(weatherMain) {
    switch(weatherMain) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
        case "Fog":
        case "Haze":
            weatherIcon.src = "images/mist.png";
            break;
        case "Snow":
            weatherIcon.src = "images/snow.png";
            break;
        case "Thunderstorm":
            weatherIcon.src = "images/thunderstorm.png";
            break;
        default:
            weatherIcon.src = "images/clouds.png";
    }
}

async function getForecast(city) {
    try {
        const response = await fetch(forecastApiUrl + city + `&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error("Forecast data not available");
        }

        const data = await response.json();
        updateForecastUI(data);
        
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        forecastSection.style.display = "none";
    }
}

function updateForecastUI(data) {
    // Process forecast data (every 8th item for daily forecast - every 24 hours)
    const dailyData = data.list.filter((item, index) => index % 8 === 0);
    
    // Store forecast items
    forecastItems = dailyData.slice(0, 5).map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: 'short' });
        const dayMonth = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' });
        
        return {
            date: `${dayName}, ${dayMonth}`,
            icon: getIconName(day.weather[0].main),
            temp: Math.round(day.main.temp),
            description: day.weather[0].description
        };
    });
    
    // Reset current page and display first page
    currentForecastPage = 0;
    displayForecastPage();
    
    // Show forecast section
    forecastSection.style.display = "flex";
    
    // Set up navigation buttons
    document.querySelector(".prev-btn").addEventListener("click", () => {
        navigateForecast(-1);
    });
    
    document.querySelector(".next-btn").addEventListener("click", () => {
        navigateForecast(1);
    });
}

function displayForecastPage() {
    // Clear current forecast items
    forecastContainer.innerHTML = "";
    
    // Display all items for desktop view or just visible items for mobile
    const isMobile = window.innerWidth <= 992;
    if (isMobile) {
        // For mobile, show all items horizontally
        forecastItems.forEach(item => {
            addForecastItem(item);
        });
    } else {
        // For desktop, show items with pagination (3 items per page)
        const itemsPerPage = 3;
        const startIdx = currentForecastPage * itemsPerPage;
        const visibleItems = forecastItems.slice(startIdx, startIdx + itemsPerPage);
        
        visibleItems.forEach(item => {
            addForecastItem(item);
        });
    }
}

function addForecastItem(item) {
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");
    
    forecastItem.innerHTML = `
        <p class="date">${item.date}</p>
        <img src="images/${item.icon}.png" alt="${item.description}">
        <p class="temp">${item.temp}°C</p>
        <p class="description">${item.description}</p>
    `;
    
    forecastContainer.appendChild(forecastItem);
}

function navigateForecast(direction) {
    const maxPages = Math.ceil(forecastItems.length / 3);
    currentForecastPage = (currentForecastPage + direction + maxPages) % maxPages;
    displayForecastPage();
}

function getIconName(weatherMain) {
    switch(weatherMain) {
        case "Clouds": return "clouds";
        case "Clear": return "clear";
        case "Rain": return "rain";
        case "Drizzle": return "drizzle";
        case "Mist":
        case "Fog":
        case "Haze": return "mist";
        case "Snow": return "snow";
        case "Thunderstorm": return "thunderstorm";
        default: return "clouds";
    }
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return hours + ':' + formattedMinutes + ' ' + ampm;
}

function updateLastUpdatedTime() {
    const now = new Date();
    document.getElementById("update-time").textContent = now.toLocaleTimeString();
}

// Click event for search button
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Enter key event for search input
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Update forecast display on window resize
window.addEventListener('resize', () => {
    if (forecastItems.length > 0) {
        displayForecastPage();
    }
});

// Add geolocation feature
document.addEventListener("DOMContentLoaded", () => {
    // Create geolocation button and add to search container
    const searchContainer = document.querySelector(".search");
    const geoButton = document.createElement("button");
    geoButton.classList.add("geo-button");
    geoButton.innerHTML = '<img src="images/location.png" alt="Current Location">';
    geoButton.title = "Use current location";
    searchContainer.appendChild(geoButton);

    // Add event listener for the geolocation button
    geoButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            loadingDiv.style.display = "flex";
            navigator.geolocation.getCurrentPosition(position => {
                getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
            }, error => {
                console.error("Geolocation error:", error);
                alert("Unable to get your location. Please check your browser settings.");
                loadingDiv.style.display = "none";
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
});

async function getWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error("Weather data not available");
        }

        const data = await response.json();
        
        // Update search box with the city name
        searchBox.value = data.name;
        
        // Update weather UI
        updateWeatherUI(data);
        
        // Get forecast data
        await getForecast(data.name);
        
        // Save city to localStorage
        localStorage.setItem("lastCity", data.name);
        
        // Update last updated time
        updateLastUpdatedTime();
        
        // Show main content
        mainContent.style.display = "flex";
        
    } catch (error) {
        console.error("Error fetching weather data by coordinates:", error);
        errorDiv.style.display = "block";
        mainContent.style.display = "none";
    } finally {
        loadingDiv.style.display = "none";
    }
}

// Add theme toggle feature
document.addEventListener("DOMContentLoaded", () => {
    // Create theme toggle button
    const card = document.querySelector(".card");
    const themeButton = document.createElement("button");
    themeButton.classList.add("theme-toggle");
    themeButton.innerHTML = '🌙';
    themeButton.title = "Toggle dark/light theme";
    card.appendChild(themeButton);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("weatherAppTheme");
    if (savedTheme === "light") {
        card.classList.add("light-theme");
        themeButton.innerHTML = '☀️';
    }

    // Add event listener for theme toggle
    themeButton.addEventListener("click", () => {
        if (card.classList.contains("light-theme")) {
            card.classList.remove("light-theme");
            themeButton.innerHTML = '🌙';
            localStorage.setItem("weatherAppTheme", "dark");
        } else {
            card.classList.add("light-theme");
            themeButton.innerHTML = '☀️';
            localStorage.setItem("weatherAppTheme", "light");
        }
    });
});