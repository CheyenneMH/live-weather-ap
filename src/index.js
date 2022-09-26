import "./styles.css";

let now = new Date();
now.getMinutes();
now.getHours();
now.getDate();
now.getDay();
let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let ampm = "am";
if (hours > 12) {
  hours -= 12;
  ampm = "pm";
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
h3.innerHTML = `${day} <br> ${hours}:${minutes}${ampm}`;
event.preventDefault();
let button = document.querySelector("button");
event.preventDefault();
button.addEventListener("click", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  console.log(`${city} ${temperature}`);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city}`;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}°F`;
}

function searchCity(city) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#name").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Broomfield");
