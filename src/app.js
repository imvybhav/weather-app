const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//define path for Express config
const publicdir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../template/views')
const partialspath = path.join(__dirname, '../template/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicdir))

app.get('/help', (req, res) => {
    res.render('help',{
        msg: ' This is a help message',
        title: 'Help',
        name: 'Vaibhav' 
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Vaibhav'

    })
})

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Vaibhav' 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=> {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'you must provide a search term'
        })   
    }
    console.log(req.query.search)
    res.send({
        products: {}
    })
})

app.get('/help/*',(req, res) => {
    res.render('error',{
        errormessage: 'Help Artical Not Found',
        title: '404',
        name:'Vaibhav'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        errormessage: 'Page Not Found',
        title: '404',
        name:'Vaibhav'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})