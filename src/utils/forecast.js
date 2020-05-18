const request = require('request')

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3e27e3c6180895b32b8eb21599018bc1&query=' + location + '&unit=m'
        
        request({ url: url, json: true}, (error, response) => {
            if (error) {
                callback('Unable to connect to weather service!')
            } else if (response.body.error) {
                callback('Unable to find location')
            } else {
                callback(response.body.current.weather_descriptions + ' throught out the day.' + 'It is currently ' + response.body.current.temperature + ' degrees out. There is ' + response.body.current.precip + '% chance of rain' )
            }
        })
}
    
    module.exports = forecast