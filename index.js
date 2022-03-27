//get elements
var cityNameEl=document.getElementById("city-name")
var cityTempEl=document.getElementById("temp-span");
var cityWindEl=document.getElementById("wind-span");
var cityHumidityEl=document.getElementById("humidity-span");
var cityUVEl=document.getElementById("uv-span");

var userInput=document.getElementById("user-input");
var submitButton=document.getElementById("submit-button");
var searchHistory= document.getElementById("search-history")
var iconHolder=document.getElementById("icon-holder");

submitButton.addEventListener("click", getLatLon)


//stores past searches on DOM, calls getLatLon. getLatLon will retrieve necesary data for function getWeather.
//getWeather is called at end of getLatLon

    var lat;
    var lon;

    function getLatLon(userSearch){
    
       var userSearch= userInput.value
       
         
    var latLonUrl= "https://api.openweathermap.org/geo/1.0/direct?q="+ userSearch +"&limit=5&appid=101cb76d79696372c35ed3684e18508b"
    fetch(latLonUrl)
    .then(function(response){
        return response.json()
        
    })
    .then(function(data){
        //check if search valid
        if (data.length===0){
            cityNameEl.innerText= "City not found";
            cityTempEl.innerText="";
            cityWindEl.innerText="";
            cityHumidityEl.innerText="";
            cityUVEl.innerText="";
            ;
            return 
        }
        console.log(data)
        searchHistAppend()
        cityNameEl.innerText= userSearch
        userInput.value="";       
        lat=data[0].lat;
        lon=data[0].lon;

        function searchHistAppend(){
            var search= userInput.value
             var newEl= document.createElement("p");
             newEl.innerText=search;
             newEl.setAttribute("city", search)
             console.log(newEl)
             searchHistory.append(newEl)
            }


getWeather(lat, lon)
    });
}


function getWeather(lat, lon){
var openWeatheMaprUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+ lat+"&lon="+lon +"&units=metric&appid=101cb76d79696372c35ed3684e18508b"
fetch(openWeatheMaprUrl)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)

cityTempEl.innerText= data.current.temp;
cityWindEl.innerText=data.current.wind_speed
cityHumidityEl.innerText=data.current.humidity
cityUVEl.innerText=data.current.uvi
iconCode=data.current.weather[0].icon
var imgURL="<img src='https://openweathermap.org/img/wn/"+iconCode+"@2x.png'>"
console.log(imgURL)
iconHolder.innerHTML= imgURL

})}
