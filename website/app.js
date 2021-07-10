/* Global Variables */
//OpenWeathermap API key
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
    lastDate.textContent = lastEntry.lastDate;
    lastTemp.textContent = lastEntry.lastTemp;
    lastFeelings.textContent = lastFeelings.lastDate;
})();


// Generating entry using the button
document.getElementById("generate").addEventListener("click",generateEntry);
async function generateEntry(){
    let d = new Date();
    let data = {};
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}`).json();
    data.lastTemp = (response.main.temp - 273.15).toFixed(2) + " °C";
    data.lastDate = `${1+d.getMonth()}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    data.lastFeelings = feelings.value;
    lastDate.textContent = data.lastDate;
    lastTemp.textContent = data.lastTemp;
    lastFeelings.textContent = data.lastFeelings;
    await fetch("/entry",{
        method: "POST",
        credentials: "same-origin",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data);
    })
}
