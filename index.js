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
var forecast= document.getElementById("forecast");

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
            forecast.innerHTML="";
            ;
            return 
        }
        searchHistAppend()
        cityNameEl.innerText= userSearch
        userInput.value="";
        //resets the 5 day forecast if checks are passed
        forecast.innerHTML="";

        lat=data[0].lat;
        lon=data[0].lon;

        function searchHistAppend(){
            var search= userInput.value
             var newEl= document.createElement("p");
             newEl.innerText=search;
             newEl.setAttribute("city", search);
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

//populate current forecast
cityTempEl.innerText= data.current.temp;
cityWindEl.innerText=data.current.wind_speed
cityHumidityEl.innerText=data.current.humidity
cityUVEl.innerText=data.current.uvi
iconCode=data.current.weather[0].icon
var imgURL="<img src='https://openweathermap.org/img/wn/"+iconCode+"@2x.png'>"
iconHolder.innerHTML= imgURL

//5 day forecast



for (let index = 1; index < 6; index++) {
//get day
 var date = new Date((data.daily[index].dt)*1000);
 console.log("the time code is "+data.daily[1].dt+"the date is "+ date.toDateString())

var forecastDaysEl= document.createElement("div")
forecastDaysEl.className="forecast-days";
//date
var newDateEl= document.createElement("h4");
newDateEl.append(date.toDateString())
forecastDaysEl.append(newDateEl)
//icon
var forecastIconEl= document.createElement("span");
var forecastDayIconRef=data.daily[index].weather[0].icon
var imgURL="<img src='https://openweathermap.org/img/wn/"+forecastDayIconRef+"@2x.png'>"
forecastIconEl.innerHTML= imgURL
//temp
var forecastTempEl=document.createElement("h5");
forecastTempEl.append("Temp: "+ data.daily[index].temp.day+ "C");
//wind
var forecastWindEl=document.createElement("h5");
forecastWindEl.append("Wind: "+ data.daily[index].wind_speed+"km/h");
//humidity
var forecastHumidEl=document.createElement("h5");
forecastHumidEl.append("Humidity: "+ data.daily[index].humidity+"%");

//append all to div
forecastDaysEl.append(forecastIconEl, forecastTempEl, forecastWindEl, forecastHumidEl)
forecast.append(forecastDaysEl)
//end of loop
}




})}
