function searchSubmit(event){
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");
let cityElement = document.querySelector("#city");
cityElement.innerHTML = searchInput.value;

searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

function displayWeather(response){
let temperatureElement = document.querySelector("#weather-temperature");
let emojiElement = document.querySelector("#emoji");
let humidityElement = document.querySelector("#humidity");
let speedElement = document.querySelector("#speed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");
iconElement.innerHTML = `<imgsrc = "${response.data.condition.icon_url}" class "weather-icon"`;


let temperature = response.data.temperature.current;
temperatureElement.innerHTML = Math.round(temperature);
emojiElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML =` ${ response.data.temperature.humidity }%`;
speedElement.innerHTML = ` ${ response.data.wind.speed}km/h`;
timeElement.innerHTML = formatDate(date);
}

function formatDate(date){
    let day = days[date.getDay()];
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (minutes < 10){
        minutes = `0 ${minutes}`;
    }

return `${day} ${hours} ${minutes}`;
}

function searchCity(city) {
    let apiKey = "46o4ft0aa94fd28cbcf4b985bc283d4f ";
    let apiUrl =
    'https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric' ;
    axios.get(apiUrl).then(displayWeather);
}
searchCity("Paris");