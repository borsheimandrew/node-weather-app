const request = require('request')

const forecast = (lng, lat, callback) => {
  const url = `https://api.darksky.net/forecast/7dae96cb451f10207a586048a59a50f5/${encodeURIComponent(lat)},${encodeURIComponent(lng)}?`

  request({ url, json: true }, (error, { body }) => {
    if (error){
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        icon: body.daily.data[0].icon,
        currently: body.currently.temperature,
        rainChance: body.currently.precipProbability
      }
      )}
  })
}

module.exports = forecast