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
let iconElement = document.querySelector("#icon");
iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class "weather-icon"/>`;
let date = new Date(response.data.time * 1000);


let temperature = response.data.temperature.current;
temperatureElement.innerHTML = Math.round(temperature);
emojiElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML =` ${ response.data.temperature.humidity }%`;
speedElement.innerHTML = ` ${ response.data.wind.speed}km/h`;
timeElement.innerHTML = formatDate(date);

getforecast(response.data.city);
}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "46o4ft0aa94fd28cbcf4b985bc283d4f" ;
    let apiUrl =
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric` ;
    axios.get(apiUrl).then(displayWeather);
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}


function getforecast(city){
let apiKey = "46o4ft0aa94fd28cbcf4b985bc283d4f";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {

    let forecastHTML = "";
    let forecast = document.querySelector("#forecast");

    
    response.data.daily.forEach(function(day, index){
        if (index < 5){ 
        forecastHTML += `
        <div class="weather-forecast-day">
        <div class="weather-forecast-date"> ${formatDay(day.time)} </div>
         <img src ="${day.condition.icon_url}" class "weather-forecast-icon"/>
        <div class="weather-forecast-temperatures"> 
        <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
      </div>
    </div>`;}
    
    
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
}

