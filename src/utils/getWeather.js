const postman = require('postman-request');

var getWeather = (lat,long)=> {  
    return new Promise((resolve,reject)=>{
        let url = `http://api.weatherstack.com/current?access_key=a419b2f0d0970f90f4faf933b02df592&query=${lat},${long}`
        postman({url: url, json: true},(err, response, body)=>{
            console.log("------------ ", body)
            console.log("------------ ", body.error)

            if(body.error){
                console.log("failed")
                resolve({
                    err: "Invalid lat and long"
                })
            }
            else{
                console.log(body.current.temperature)
                resolve({
                    msg: `It is currently ${body.current.temperature} degrees out. There is ${body.current.weather_descriptions[0]}`,
                    location: `${body.location.name}, ${body.location.country}`
                });
            }
        })
    })      
}

module.exports = getWeather;