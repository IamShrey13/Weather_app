document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const Temperature = document.getElementById('temperature');
    const Description = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = "9cadbbd1c2a465cfa5b10b410a08d0a3"; //environment variables

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return;

        //it may throw an error
        // server/database is always in another continent
        
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city){
        //gets the data
        const URL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API_KEY}`;

        const response = await fetch(URL);

        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data = await response.json();
        return data;

    }

    function displayWeatherData(data){
        //display
        const {name, main, weather} = data;
        cityName.textContent = name;
        Temperature.textContent = `Temperature ${main.Temperature}`;
        Description.textContent = `Weather: ${weather.Description}`

        //unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
});