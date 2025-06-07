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
let temperature = response.data.temperature.current;
temperatureElement.innerHTML = Math.round(temperature);
}


function searchCity(city) {
    let apiKey = "46o4ft0aa94fd28cbcf4b985bc283d4f ";
    let apiUrl =
    'https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric' ;
    axios.get(apiUrl).then(displayWeather);
}
searchCity("Paris");