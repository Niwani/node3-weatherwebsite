const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Caspian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Eniola Adio'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        docu: 'Eniola Adio is here to help you.',
        ment: 'How may i be of help?',
        name: 'Eniola Adio'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    } else {
        geocode(req.query.address, (error, { location} = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(location, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                } else {
                      res.send({ 
                    address: req.query.address,
                    location,
                    forecast: forecastData
                    })
                } 
            })
        })
    }
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search option'
        })
    }

    console.log(req.query.search)
    res.send({
        product: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eniola Adio',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eniola Adio',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
}
)