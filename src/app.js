const path = require('path') //inbuilt by node
const express = require('express'); //express is a function called to create new express application
const hbs = require('hbs');

const getWeather = require('./utils/getWeather')

console.log(__dirname);// console.log(__filename);

//define paths
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials")

//create express app
const app = express();
const PORT = process.env.PORT || 3000

//customize express app
app.set('view engine','hbs'); //to tell express that we are using handlebars
app.set('views', viewsPath) //else by default takes from src/views
hbs.registerPartials(partialsPath)

//to serve up the directory - way to customize server (where to get static pages)
app.use(express.static(publicDirPath));

//set routes
app.get('',(req, res)=>{
    // res.send("okay")
    res.render('index',{
        title: "Index",
        name: "Sakshi Munjal"
    });//to render a view by default from views folder
})

app.get('/about',(req,res)=>{

    console.log("img " + path.join(__dirname , "../public/images/eyeFinal.png"))
    res.render('about',{
        title: "About",
        name: "Sakshi Munjal"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Sakshi Munjal"
    })
})

app.get('/weather', async(req,res)=>{
    //get lat and log from url req
    if(!req.query.lat || !req.query.long){
        return res.render('404',{
            title: "Error!",
            errMsg: "Lat or Long missing",
            name: "Sakshi Munjal"
        })
    }

    // console.log("getWeather = ", getWeather)
    // res.send({
    //     lat: req.query.lat,
    //     long: req.query.long
    // })
    let response = await getWeather(req.query.lat, req.query.long);

    if(response.err){
        return res.send({
            err : response.err
        })
    }
    res.send({
        location: response.location,
        msg : response.msg
    })
})

app.get('/products', (req,res)=>{
    //localhost:5000/products?search=games
    if(!req.query.search){
        return res.render('404',{
            title: "Error!",
            errMsg: "Search terms not provided",
            name: "Sakshi Munjal"
        })
    }
    console.log(req.query)
    res.send({
        forcast: "Rainy",
        loaction : "Delhi, India"
    })
})

app.get('/help/*', (req,res)=>{
    res.render("404",{
        title: "Error!",
        errMsg: "Help article not found. Check your URL",
        name: "Sakshi Munjal"
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title: "Error!",
        errMsg: "Page not found. Check your URL",
        name: "Sakshi Munjal"
    })
})

app.listen(PORT, ()=>{
    console.log("started at " + PORT)
})
