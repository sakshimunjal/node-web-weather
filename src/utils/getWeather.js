const postman = require('postman-request');

var getWeather = (lat,long)=> {  
    return new Promise((resolve,reject)=>{
        // let url = `http://api.weatherstack.com/current?access_key=a419b2f0d0970f90f4faf933b02df592&query=37.8267,-122.4233`
        let url = `/weather?lat=${lat}&long=${long}`
        postman({url: url, json: true},(err, response, body)=>{
            console.log("------------ ", body)

            if(body.error){
                console.log("failed")
                resolve({
                    err: "Invalid lat and long"
                })
            }
            else{
                resolve({
                    msg: `It is currently ${body.current.temperature} degrees out. There is ${body.current.weather_descriptions[0]}`,
                    location: `${body.location.name}, ${body.location.country}`
                });
            }
        })
    })      
}

module.exports = getWeather;