const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app =express();

app.use(express.static("WeatherApp"));

app.use(bodyParser.urlencoded({extended:true}));
//get function
app.get("/",function(req,res){

  res.sendFile(__dirname+"\\weather.html");

  });

  //post function
  app.post("/",function(req,res)
  {

   var cityi=req.body.city;
   console.log(cityi);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityi+"&appid=edfa51a4ff3946732f60307189d4da34&units=metric";
  //  res.write("server");

     https.get(url,function(response)
     {
         console.log(response);
        response.on("data",function(data)
       {
         const weather = JSON.parse(data);
         console.log(weather);
         const t = weather.main.temp;
         const imgurl="http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png";
         //const i =weather.weather[0].icon+".png";
        // console.log(i);
      //  res.write("<img src="+C:\\Users\\Shashwat\\Desktop\\projects\\WeatherApp\\weather-news+".png>");

         res.write("<p>"+weather.weather[0].description+" </p>");
         res.write("<H1>THE TEMPERATURE IN "+cityi+" IS : "+t+" </H1>");
        res.write("<img src="+imgurl+" > ");
         res.send();
         console.log(t);
         console.log("================================================================================================");
       })

    })
 });

app.listen(3000);
