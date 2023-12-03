const lat = document.querySelector(".lat");
const long = document.querySelector(".long");

const userLatValue = localStorage.getItem("lat");
const userLongValue = localStorage.getItem("long");

const box2 = document.querySelector(".box2");

// const api = "48dff6e4d6cb13b4a30482b24d45c365";
const api = "9f8aa257b1e4cffba5eb3212ded65b14";

const map = document.querySelector(".map");

map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${userLatValue},${userLongValue}&output=embed" width="100%" height="400" frameborder="0" style="border:0"></iframe>`

lat.innerText = "Lat : " + userLatValue;
long.innerText = "Long : " + userLongValue;

const infoArrTitle = ["Location: ", "Wind Speed: ","Humidity: ","Time Zone: ","Pressure: ","Wind Direction: ","UV Index: ","Feels like: "];
async function getData(){
    const endPoint = `https://api.openweathermap.org/data/2.5/weather?APPID=9f8aa257b1e4cffba5eb3212ded65b14&lat=${userLatValue}&lon=${userLongValue}&units=metric`;

    try{
        const response = await fetch(endPoint);
        const result = await response.json();

        const info = document.createElement("div");
        info.className = "info";
        const timeZone = result.timezone;
        const hours = Math.floor(timeZone / 3600)
        const minutes = Math.floor((timeZone % 3600) / 60)

        info.innerHTML = `
        <div class="info-box">Location: ${result.name}</div>
        <div class="info-box">Wind Speed: ${result.wind.speed}kmph</div>
        <div class="info-box">Humidity: ${result.main.humidity}</div>
        <div class="info-box">Time Zone: GMT ${hours+":"+minutes}</div>
        <div class="info-box">Pressure: ${result.main.pressure} atm</div>
        <div class="info-box">Wind Direction: ${getWindDirection(result.wind.deg)}</div>
        <div class="info-box">UV Index: 1</div>
        <div class="info-box">Feels like: ${result.main.feels_like}°</div>
        `
        box2.appendChild(info);
    }
    catch(error){
        alert("Something went wrong");
    }
}

function getWindDirection(degree){
    if(degree == 0){
        return "North";
    }
    else if(degree == 90){
        return "East";
    }
    else if(degree == 180){
        return "South";
    }
    else if(degree == 270){
        return "West";
    }
    else if(degree > 0 && degree < 90){
        return "North-East";
    }
    else if(degree > 90 && degree < 180){
        return "South-East";
    }
    else if(degree > 180 && degree < 270){
        return "South-West";
    }
    else if(degree > 180 && degree < 360){
        return "North-West";
    }
}

getData();

