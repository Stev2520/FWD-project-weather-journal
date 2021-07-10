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

// Show last entry
(async function() {
    const lastEntry = await fetch("/all");
    lastDate.innerHTML = lastEntry.lastDate;
    lastTemp.innerHTML = lastEntry.lastTemp;
    lastFeelings.innerHTML = lastFeelings.lastDate;
})();


// Generating entry using the button
document.getElementById("generate").addEventListener("click",generateEntry);
async function generateEntry(){
    let d = new Date();
    let data = {};
    let response = await fetch(apiBase + zipCode.value + "&appid=" + apiKey).then(res => res.json());
    data.lastTemp = (response.main.temp + " °C";
    data.lastDate = `${1+d.getMonth()}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    data.lastFeelings = feelings.value;
    lastDate.innerHTML = data.lastDate;
    lastTemp.innerHTML = data.lastTemp;
    lastFeelings.innerHTML = data.lastFeelings;
    await fetch("/entry",{
        method: "POST",
        credentials: "same-origin",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data);
    })
}
