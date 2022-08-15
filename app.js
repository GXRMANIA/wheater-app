let unit = "metric";

function sleeper(ms) {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }


function getWeather(city, unit) {
    startLoading();
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b175c2aefe32be480ff27b12fc78e51&units=${unit}`, { 
    mode: "cors"})
    .then(sleeper(1000))
    .then((data) => data.json())
    .then((res) => {
        endLoading();
    return {
            city: city,
            temp: res.main.temp,
            description: res.weather[0].description,   
        }
    })
}
    

// cache dom
const submitBtn = document.querySelector("#submitBtn");
const switchBtn = document.querySelector(".switch")
const search = document.querySelector("#search");
const main = document.querySelector(".main");
const loading = document.querySelector(".loading")

// events
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    update(search.value, unit)
})

function startLoading() {
    loading.classList.remove("invisible");
}

function endLoading() {
    loading.classList.add("invisible");
}

function update(city, unit) {
    getWeather(city, unit)
    .then((weather) => {
        if(unit === "metric") {
            main.innerHTML = `
            <h1>${weather.city}</h1>
            <p>${weather.temp} °C</p>
            <p>${weather.description}</p>
            ` 
        } else {
            main.innerHTML = `
            <h1>${weather.city}</h1>
            <p>${weather.temp} °F</p>
            <p>${weather.description}</p>
            ` 
        } 
    })
    .catch((err) => {
        displayError();
    })
}

switchBtn.addEventListener("click", () => {
    if(unit == "metric") {
        unit = "imperial";
        switchBtn.textContent = "Change to °C"
    } else {
        unit = "metric";
        switchBtn.textContent = "Change to °F"

    }
    if(search.value === "") return;
    update(search.value, unit)
    
})



function displayError() {
    main.innerHTML = `
        <h1>City not found</h1>
        <p>Please try again</p>
        <p></p>
    ` 
}

