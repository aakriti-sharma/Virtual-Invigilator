// Importing Dependencies
const express = require('express')
var app = express()
var PORT = process.env.PORT || '4000'
require('dotenv').config()
require('./db/mongoose')
const bodyParser = require('body-parser')
const partialsPath = 'templates/partials'
const viewsPath = 'templates/views'
const publicPath = 'public'
const staticRouter = require('./routers/staticRouter')
const studentRouter = require('./routers/studentRouter')
const teacherRouter = require('./routers/teacherRouter')
const session = require('express-session')
const examRouter = require('./routers/examsRouter')

// Configuring Express
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true }))

// Setting up Routes
app.use(staticRouter)
app.use(studentRouter)
app.use(teacherRouter)
app.use(examRouter)

// Setting Views and Partials Path
app.set('view engine', 'ejs')
app.use(express.static(publicPath))
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index')
})

// Listening to Localhost
app.listen(PORT, () => {
    console.log(`Server up on Port : ${PORT}`)
})