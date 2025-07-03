const API_KEY = "f8bfcd960b869ab302ef50fab58de228";
const CITY_API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const GEO_API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

let searchBox = document.querySelector('.search input');
let searchButton = document.querySelector('.search button');
let locationButton = document.querySelector('.location-btn');
let weatherIcon = document.querySelector('.weather-icon');

const displayWeather = (data) => {
    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = 'Humidity: ' + data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = 'Wind: ' + data.wind.speed + ' km/h';

    const condition = data.weather[0].main;

    if (condition === "Clouds") {
        weatherIcon.src = "./images/clouds.png";
    } else if (condition === "Clear") {
        weatherIcon.src = "./images/clear.png";
    } else if (condition === "Rain") {
        weatherIcon.src = "./images/rain.png";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "./images/drizzle.png";
    } else if (condition === "Mist") {
        weatherIcon.src = "./images/mist.png";
    } else if (condition === "Snow") {
        weatherIcon.src = "./images/snow.png";
    }

    document.querySelector('.weather').style.display = 'block';
};

const checkWeatherByCity = async (city = "Delhi") => {
    try {
        const res = await fetch(CITY_API_URL + city + `&appid=${API_KEY}`);
        const data = await res.json();
        displayWeather(data);
    } catch (error) {
        console.log(error.message);
        alert("City not found. Please try again.");
        document.querySelector('.weather').style.display = 'none';
    }
};

const checkWeatherByLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const res = await fetch(`${GEO_API_URL}&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                const data = await res.json();
                searchBox.value = data.name;
                displayWeather(data);
            } catch (error) {
                console.log(error.message);
                alert("Failed to get weather by location.");
            }
        }, () => {
            alert("Location permission denied.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
};


searchButton.addEventListener('click', () => {
    checkWeatherByCity(searchBox.value);
});

locationButton.addEventListener('click', checkWeatherByLocation);

// Default city on load
checkWeatherByCity();
