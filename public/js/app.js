fetch('http://puzzle.mead.io/puzzle').then((res)=>{
    res.json().then((data)=>{
        console.log(data.puzzle)
    })
})

const weatherForm = document.querySelector('form');
const lat = document.querySelector('#lat')
const long = document.querySelector('#long')
const locationP = document.querySelector('#location')
const forecastP= document.querySelector('#forecast')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(lat.value)
    console.log(long.value)

    locationP.textContent = "Loading"
    forecastP.textContent = "..."

    fetch(`http://api.weatherstack.com/current?access_key=a419b2f0d0970f90f4faf933b02df592&query=${lat.value},${long.value}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            locationP.textContent = data.error   
            forecastP.textContent = ""
        }
        else{
            locationP.textContent = data.location.name + ", " + data.location.country
            forecastP.textContent = data.current.weather_descriptions[0] + " Temp = " + data.current.temperature
        }
    })
})
})