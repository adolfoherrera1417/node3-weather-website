const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Define paths for weather app utils
const geoCodePath = path.join(__dirname,'/utils/geocode.js')
const forecastPath = path.join(__dirname,'/utils/forecast.js')

// Setup weather app utils
const geoCode = require(geoCodePath)
const forecast = require(forecastPath)


/* app.get(route,function(request,response)) */

// HOME page
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Adolfo Herrera'
    })
})

 // ABOUT Page
app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About page',
        name: 'Adolfo Herrera'
    })
})

// HELP page
app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Adolfo Herrera'
    })
})

// USING WEATHER UTILS!
app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "address must be provided"
        })
    }

    geoCode(req.query.address, (error, data) => {
        if(error) {
            return res.send({error})
        }
        const location = data.location
        forecast(data.latitude, data.longitude, (error, data) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                temperature: data.temperature,
                location,
                summary: data.summary,
                temperatureHigh: data.temperatureMax,
                temperatureLow: data.temperatureMin
            })
            })
    })
      
})

// ********************************************* DO NOT TOUCH ***************************************************

app.get('/help/*',(req,res) => {
    res.render('articleerror',{
        title: '404',
        name: 'Adolfo Herrera',
        errorMessage: 'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('pageerror',{
        title: '404',
        name: 'Adolfo Herrera',
        errorMessage: 'Page not found!'
    })
}) 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})