const request = require('request')

const forecast = (long, lad, callback) => {
    const url = 'https://api.darksky.net/forecast/e2f4917ad2a3cc709098169c9231163b/'+ encodeURIComponent(lad) + ',' + encodeURIComponent(long)

    request({url, json: true},(error,response) =>{
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined,{
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                temperatureMax: response.body.daily.data[0].temperatureMax,
                temperatureMin: response.body.daily.data[0].temperatureMin
            })
        }
    })
}

module.exports = forecast