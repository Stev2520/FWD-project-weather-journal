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
    }catch(err){
        console.log(err);
    }
}

updateEntry();

//Getting Weather Data from OpenWeatherMap API
async function getWeather(){
    let response = await fetch(apiBase + zipCode.value + "&appid=" + apiKey);
    if(response.status==404) alert("ZIP code not found");
    console.log(response);
    try{
        response = await response.json();
        return response;
    }catch(err){    
        console.log(err);
    }
}

// Generating entry using the button
document.getElementById("generate").addEventListener("click",generateEntry);
async function generateEntry(){
    // Getting Entry time
    let d = new Date();

    // getting weather data
    let weather = await getWeather();

    //Posting Entry to server
    await fetch("/entry",{
        method: "POST",
        credentials: "same-origin",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            lastTemp: weather.main.temp + " °C",
            lastDate: `${1+d.getMonth()}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
            lastFeelings: feelings.value
        })
    }).then(function(){
        console.log(`Post request at ${d}`);
        updateEntry();
    });
}
