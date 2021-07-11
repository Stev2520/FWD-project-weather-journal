/* Global Variables */
//OpenWeathermap API
const apiBase = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "42759c50ec83a021669181d38d7ace61";

// Inputs
const zipCode = document.getElementById("zip");
const feelings = document.getElementById("feelings");

// Last Entry 
const lastFeelings = document.getElementById("content");
const lastDate = document.getElementById("date");
const lastTemp = document.getElementById("temp");
/* End Global Variables */

// Updating Entry Holder function
async function updateEntry(){
    const response = await fetch("/all");
    try{
        const lastEntry = await response.json();
        lastDate.innerHTML = lastEntry.lastDate;
        lastTemp.innerHTML = lastEntry.lastTemp;
        lastFeelings.innerHTML = lastEntry.lastFeelings;
    } catch(err) {console.log(err);}
}

updateEntry();

//Getting Weather Data from OpenWeatherMap API
async function getWeather(){
    const response = await fetch(apiBase + zipCode.value + "&appid=" + apiKey);
    try {return response.json();}
    catch(err) {console.log(error);}
}

// Generating entry using the button
document.getElementById("generate").addEventListener("click",generateEntry);
async function generateEntry(){
    let d = new Date();
    let data = {};
    weather = getWeather();
    data.lastTemp = weather.main.temp + " °C";
    data.lastDate = `${1+d.getMonth()}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    data.lastFeelings = feelings.value;
    await fetch("/entry",{
        method: "POST",
        credentials: "same-origin",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(function(){
        console.log(`Post request at ${d}`);
        updateEntry();
    });
}
