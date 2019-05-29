const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Borsheim'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Borsheim'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'reboot your computer',
    title: 'Help',
    name: 'Andrew Borsheim'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        })
      })
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Borsheim',
    message: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found',
    title: '404',
    name: 'Andrew Borsheim'
  })
})


// Start Server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})