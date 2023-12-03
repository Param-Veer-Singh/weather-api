const fetchBtn = document.querySelector(".fetch-data");
const lat = 0;
const long = 0;
fetchBtn.addEventListener('click',()=>{
   navigator.geolocation.getCurrentPosition(success,failed);
});

function success(position){
    localStorage.setItem('lat',position.coords.latitude);
    localStorage.setItem('long',position.coords.longitude);
    window.location.href = "./main.html";
}

function failed(){
    alert("Please give location access");
}

