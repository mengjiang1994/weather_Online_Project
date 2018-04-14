var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;

function load(){
    var city = document.getElementById('city').value;
    if(city === ""){
        city = "Brisbane";
    }
    var weatherConditionURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/'+city+'.json';
	var weatherForecastURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/'+city+'.json';

    //Below is the code from lecture slide
    //     Loading JSON using AJAX
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', "data.json", true);
    // xhr.responseType = 'text';
    // xhr.send();
    // xhr.onload = function() {
    //  if(xhr.status === 200) {
    //  var myObj = JSON.parse(xhr.responseText);
    //  }
    // }

    weatherConditions.open("GET", weatherConditionURL, true);
    weatherConditions.responseType = "text";
    weatherConditions.send(null);

    weatherForecast.open("GET", weatherForecastURL, true);
    weatherForecast.responseType = 'text'; 
	weatherForecast.send(null);

	document.getElementById('city').value = '';
}

load();
// GET THE CONDITIONS

weatherConditions.onload = function() {
	console.log(weatherConditions);
    if (weatherConditions.status === 200){

        cObj = JSON.parse(weatherConditions.responseText); 
        console.log(cObj);
        
        if(cObj.response.error){
            alert(cObj.response.error.description);
            load();
        } else {
            document.getElementById("location").innerHTML = cObj.current_observation.display_location.full; 
            document.getElementById("weather").innerHTML = cObj.current_observation.weather; 
            document.getElementById("temperature").innerHTML = cObj.current_observation.temp_c + 'c'; 
        }
    }  else { alert(weatherConditions.status);
    
    }
}; 

//Get the forecarst information
weatherForecast.onload = function(){
    if (weatherConditions.status === 200){
        fObj = JSON.parse(weatherForecast.responseText);
        console.log(fObj);
        document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday[0].fcttext_metric;
        //Day 1
        document.getElementById('r1c1').innerHTML = fObj.forecast.simpleforecast.forecastday[1].date.weekday;
        document.getElementById('r1c3').innerHTML = fObj.forecast.simpleforecast.forecastday[1].high.celsius + '';
        document.getElementById('r1c4').innerHTML = fObj.forecast.simpleforecast.forecastday[1].low.celsius + '';
        var imgPath = fObj.forecast.simpleforecast.forecastday[1].icon_url
        document.getElementById('r1c2').src = imgPath;
        //我也不知道上面每行最后的 + ''; 有什么用，或许是写着玩的？

        //Day 2
        document.getElementById('r2c1').innerHTML = fObj.forecast.simpleforecast.forecastday[2].date.weekday;
        document.getElementById('r2c3').innerHTML = fObj.forecast.simpleforecast.forecastday[2].high.celsius + '';
        document.getElementById('r2c4').innerHTML = fObj.forecast.simpleforecast.forecastday[2].low.celsius + '';
        var imgPath = fObj.forecast.simpleforecast.forecastday[2].icon_url
        document.getElementById('r2c2').src = imgPath;
        
        //Day 3
        document.getElementById('r3c1').innerHTML = fObj.forecast.simpleforecast.forecastday[3].date.weekday;
        document.getElementById('r3c3').innerHTML = fObj.forecast.simpleforecast.forecastday[3].high.celsius + '';
        document.getElementById('r3c4').innerHTML = fObj.forecast.simpleforecast.forecastday[3].low.celsius + '';
        var imgPath = fObj.forecast.simpleforecast.forecastday[3].icon_url
        document.getElementById('r3c2').src = imgPath;

        //Day 4
        document.getElementById('r4c1').innerHTML = fObj.forecast.simpleforecast.forecastday[4].date.weekday;
        document.getElementById('r4c3').innerHTML = fObj.forecast.simpleforecast.forecastday[4].high.celsius + '';
        document.getElementById('r4c4').innerHTML = fObj.forecast.simpleforecast.forecastday[4].low.celsius + '';
        var imgPath = fObj.forecast.simpleforecast.forecastday[4].icon_url
        document.getElementById('r4c2').src = imgPath;

        //Day 5
        document.getElementById('r5c1').innerHTML = fObj.forecast.simpleforecast.forecastday[5].date.weekday;
        document.getElementById('r5c3').innerHTML = fObj.forecast.simpleforecast.forecastday[5].high.celsius + '';
        document.getElementById('r5c4').innerHTML = fObj.forecast.simpleforecast.forecastday[5].low.celsius + '';
        var imgPath = fObj.forecast.simpleforecast.forecastday[5].icon_url
        document.getElementById('r5c2').src = imgPath;
    }
}
