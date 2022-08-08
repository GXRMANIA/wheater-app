async function getWeather(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b175c2aefe32be480ff27b12fc78e51`, { 
        mode: "cors"});
    const res = await data.json();
    console.log(res)
    console.log({
        temp: res.main.temp,
        description: res.weather[0].description,
    })   
    return {
        temp: res.main.temp,
        description: res.weather[0].description,
    }
}

getWeather("london")

const submitBtn = document.querySelector("#submitBtn");
const search = document.querySelector("#search");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(search.value)
})