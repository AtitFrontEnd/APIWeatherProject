

const express = require("express");

//https to send the response to the client server
const https = require("https");

//body parser to get the text which client writes as input value
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({exrended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appid = "dd957cf2ffdc69a64c8b80cd1efc3690";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&appid=" + appid + "&units=" + unit;

  https.get(url, function(response){

    //response.on will read the data from the 3rd party server
    response.on("data", function(data){
      console.log(response.statuscode);

      //converting the data to JSON object by parse method
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
        res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius with weather " + description + " right now! </h1>");
        res.write("<img src=" + imageURL +">");
        res.send();
    })
  })
})


app.listen(3000, function(){
  console.log("Your server is running on server 3000");
});
