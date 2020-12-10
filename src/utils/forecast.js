const request = require('request')

const forecast = (lat, long, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=a8bb3b95ccfcd9f4362a7d3c836fd8b8&query='+ lat +',' + long + '&units=m'

    request({
        url: url,
        json: true
    },(error, {body} = {}) => {
        if (error) {
            callback('Unable to connect weather services!', undefined)
        }
        else if(body.error) {
            callback('Unable to find, Try another search', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] +', It is currently '+ body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
        }

    })

}

module.exports = forecast