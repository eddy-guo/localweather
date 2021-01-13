window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationIcon = document.querySelector(".weather-icon");
  let temperatureSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=40b43ab56bebc205bb381d258e000e1c`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const { description } = data.weather[0];
          const { icon } = data.weather[0];
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.name;

          let fahrenheit = temp * (9 / 5) + 32;

          locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = Math.floor(fahrenheit);
            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
