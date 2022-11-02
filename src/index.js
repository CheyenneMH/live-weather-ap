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
            h3.innerHTML = `${day}, <br> ${hours}:${minutes}${ampm}`;

            let button = document.querySelector("#searchButton");
            button.addEventListener("click", handleSubmit);

           
            function showCurrent(response) {
                farenheitTemperature = (response.data.main.temp);
                let temperature = Math.round(farenheitTemperature);
                let city = response.data.name;
                let currentCity = document.querySelector("#current-city");
                currentCity.innerHTML = `${city}`;
                
                
                let currentTemperature = document.querySelector("#temperature");
                currentTemperature.innerHTML = `${temperature}`;
                
                let description = response.data.weather[0].main;
                let currentCondition = document.querySelector("#condition");
                currentCondition.innerHTML = `${description}`
            
                let humidity = response.data.main.humidity;
                let currentHumidity = document.querySelector("#humidity");
                currentHumidity.innerHTML = `${humidity}%`;
                
                let feelsLike = Math.round(response.data.main.feels_like);
                let currentFeel = document.querySelector("#feelsLike");
                currentFeel.innerHTML = `${feelsLike}`;
                
                let wind = Math.round(response.data.wind.speed);
                let currentWind = document.querySelector("#wind");
                currentWind.innerHTML = `${wind}mph`;

                let high = Math.round(response.data.main.temp_max);
                let currentHigh = document.querySelector("#high");
                currentHigh.innerHTML = `${high}`;

                let low = Math.round(response.data.main.temp_min);
                let currentLow = document.querySelector("#low");
                currentLow.innerHTML = `${low}`;

                getForecast(response.data.coord);

                if (description === "Clouds") {
                document.getElementById("weatherIconLarge").src = "media/cloudy.png";
                document.body.style.backgroundImage = "url('media/cloudy.jpg')";
                document.getElementById("displayBox").style.background = "linear-gradient(113deg, #9DC5BB 23%, #DEE5E5 49%, #304950 100%)";
                }
            }

            function searchCity(city) {
                let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
                axios.get(apiUrl).then(showCurrent);
            }

            function handleSubmit(event) {
                event.preventDefault();
                let city = document.querySelector("#name").value;
                searchCity(city);
            }

            let searchForm = document.querySelector("#search-form");
            searchForm.addEventListener("submit", handleSubmit);

            function displayCelsiusTemperature(event){
                event.preventDefault();
                let currentTemperature = document.querySelector("#temperature");                
                let celsiusTemperature = Math.round((farenheitTemperature -32*5/9));
                currentTemperature.innerHTML = `${celsiusTemperature}`;
                let celsiusDegrees = document.querySelector("#degreesCurrent");
                celsiusDegrees.innerHTML = "°C";
            }
            
            let farenheitTemperature = null;

            let celsiusLink = document.querySelector("#celsius");
            celsiusLink.addEventListener("click", displayCelsiusTemperature);

            function formatDay(timestamp) {
                let date = new Date(timestamp * 1000);
                let day = date.getDay();
                let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                return days[day];
                }

            function displayForecast(response) {
                let forecast = response.data.daily;

                let forecastElement = document.querySelector("#forecast");

                let forecastHTML = `<div class="column">`;
                forecast.forEach(function (forecastDay, index) {
                    if (index < 5) {
                        forecastHTML =
                            forecastHTML +
                            `
                    <li id="forecast">${formatDay(forecastDay.dt)} 
                    <img id="weatherIcon1" src=media/sunny.png width="40">
                    <br>
                    <span id="forecastValues">
                        <span id="forecastHigh">H:${Math.round(
                        forecastDay.temp.max)}
                        °F</span>
                        &nbsp;
                        <span id="forecastLow">L:${Math.round(
                            forecastDay.temp.min)}°F</span>
                    </span>
                    `;
                    }
                    });
                    
                forecastHTML = forecastHTML + `</div>`;
                forecastElement.innerHTML = forecastHTML;
                console.log(forecastHTML);
            }
    
            function getForecast(coordinates) {
            console.log(coordinates);
            let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
            let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
            axios.get(apiUrl).then(displayForecast);
            }

            searchCity("Broomfield");