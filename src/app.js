const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)


const app = express()
const port = process.env.PORT || 3000


//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)



//Setup static directory to set up
app.use(express.static(publicDirectoryPath))


//routing
app.get('',(req,res) => {
    res.render('index',{
    title:'Weather App',
    name:'Andrew Mead'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
    title:'About me',
    name:'Andrew Mead'
    })
})

app.get('/help',(req,res) => {
    res.render('about',{
    title:'Help Page',    
    hlptxt:'help text',
    name:'Andrew Mead',

    })
})







app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error){
            return res.send({ error })
        }
        forecast(latitude , longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
           res.send({
               forecast:forecastData,location,
               address:req.query.address
           })
          })
    })


    // res.send({
        
    //    latitude:89,
    //    longitude:99,
    //    adress:req.query.address
    // })
})


app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search error'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'Andrew Mead',
        error:'Help article Not Found'
    })

})


app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'Andrew Mead',
        error:'Page Not Found'
    })

})

//app.com
//app.com/help
//app.com/about



app.listen(port, () => {
    console.log('Server is up on port 3000.'  + port)
})