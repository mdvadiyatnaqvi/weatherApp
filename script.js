const UNSPLASH_API_KEY = "s0v3pkIrbmJp47Bd8kAXZSEv_tuMjbm0FiPd_UwgMyY"; // Store Unsplash API key in a variable

let weather = {
    apiKey: "346e8de7867506b85c62aeb58534f567",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => {
                this.displayWeather(data);
                this.fetchRandomImage(city); // Fetch background image related to the city
            })
            .catch((error) => {
                console.error("Error fetching weather data: ", error);
            });
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        const city = document.querySelector(".search-bar").value;
        this.fetchWeather(city);
    },
    fetchRandomImage: function (city) {
        fetch(
            `https://api.unsplash.com/photos/random?query=${city}&client_id=${UNSPLASH_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                document.body.style.backgroundImage = `url(${data.urls.full})`;
            })
            .catch((error) => {
                console.error("Error fetching background image: ", error);
            });
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

// Initial load
weather.fetchWeather("Moradabad");
