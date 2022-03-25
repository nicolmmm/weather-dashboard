var userInput=document.getElementById("user-input");
var submitButton=document.getElementById("submit-button");

submitButton.addEventListener("click", getLatLon)

var currentSearchLatLon= {
    lat:0,
    lon:0
    }

    function getLatLon(userSearch){

       var userSearch= userInput.value
        userInput.value="";
         
    var latLonUrl= "https://api.openweathermap.org/geo/1.0/direct?q="+ userSearch +"&limit=5&appid=101cb76d79696372c35ed3684e18508b"
    console.log(latLonUrl)
    fetch(latLonUrl)
    .then(function(response){
        return response.json()
        
    })
    .then(function(data){

        currentSearchLatLon.lat=data[0].lat
currentSearchLatLon.lot=data[0].lon
console.log(data)
        

    });
}
