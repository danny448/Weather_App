const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");



const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    
  res.sendFile(__dirname + "/index.html");

 })


 app.post("/",function(req,res){
const CityName = req.body.cityName;

//   const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=sexist"

const query = CityName;
const apiKey = "2ca8dd8f72a6fe1580665788213b54a3";
const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey +"&q= "+ query +"&units=metric";
 https.get(url, function(response){
  // console.log(response.statusCode);

  response.on("data", function(data){
    const WeatherData = JSON.parse(data)

    const temp = WeatherData.main.temp;
    // console.log("The weather description in Kumasi is currently " + temp);

    const desc = WeatherData.weather[0].description;
    const Icon = WeatherData.weather[0].icon;

    const ImgURL = "http://openweathermap.org/img/wn/" + Icon + "@2x.png";

 
   
    res.write("<h1>The current temperature in " + CityName + " is " + temp + " deg celcius " + " </h1>")
    res.write("<p>Weather descrption : " + desc +"</p>");
    res.write("<img src=" + ImgURL + ">")


    res.send();
   

// response.on("data", function(data){
//     const JokesData = JSON.parse(data);
   

//     console.log(Jokes);
    //res.send("<h1>" + Jokes + "</h1>");


  })

 })

})


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})
