const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f58156248673c7868305dc36822dcdf0&query=' + latitude +  ','  + longitude + '&units=f'

    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.error){
            callback('Unable to find location.Try another way', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions + " . It is currently " + body.current.temperature + " degrees but it feels like " + body.current.feelslike)
        }
    })
}


module.exports = forecast