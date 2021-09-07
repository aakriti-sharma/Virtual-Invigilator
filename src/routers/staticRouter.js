const express = require('express')
var app = express()
const router = express.Router()
const verifyToken = require('../authentication/verifyToken')
const loginAuth = require('../authentication/loginAuth')
const session = require('express-session');
const jwt = require('jsonwebtoken')

/**
 * @method - GET
 * @route - /
 * @param - none
 * @description - Landing Page of website.
 * @access - All
 */
router.get('/', (req, res) =>{
    try{
        res.status(200).render('index')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /
 * @param - none
 * @description - Landing Page of website.
 * @access - All
 */
router.get('/', (req, res) =>{
    try{
        res.status(200).render('index')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /help
 * @param - none
 * @description - Help Page of website.
 * @access - All
 */
router.get('/help', (req, res) =>{
    try{
        res.status(200).render('help')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /login
 * @param - none
 * @description - Login Page.
 * @access - All
 */
router.get('/login', (req, res) =>{
    try{
        res.status(200).render('login')
    }catch(e){
        console.log(e)
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /sessionAuth
 * @param - none
 * @description - Login Page.
 * @access - All
 */
router.post('/sessionAuth', (req, res) =>{
    try{
        if(req.session.accessToken){
        jwt.verify(req.session.accessToken, process.env.JWT_SECRET_TOKEN, (err, user) => {
            if(err){
                return res.status(403).send('Wrong')
            }
            res.status(200).send(user)
        })
        }else{
            res.status(400).send('No Session')
        }
        // res.send('Hi')
    }catch(e){
        console.log(e)
        res.status(500)
    }
})

/**
 * @method - POST
 * @route - /login
 * @param - User Email, Password.
 * @description - Login Authentication.
 * @access - All
 */
router.post('/login', loginAuth, (req, res) =>{
    try{
        req.session.accessToken = req.accessToken
        res.status(200).send('Done')
    }catch(e){
        res.status(500).send('Incorrect')
    }
})

/**
 * @method - GET
 * @route - /register
 * @param - none
 * @description - Registration Page of website.
 * @access - All
 */
router.get('/register', (req, res) =>{
    try{
        res.status(200).render('register')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /dashboard
 * @param - Token
 * @description - Dashboard Page of website.
 * @access - All
 */
router.get('/dashboard', verifyToken, (req, res) =>{
    try{
        // console.log(req.user)
        res.render('dashboard', {
            user: req.user
        })
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

/**
 * @method - GET
 * @route - /logout
 * @param - none
 * @description - Logout Page of website.
 * @access - All
 */
router.get('/logout', (req, res) =>{
    try{
        req.session.destroy();
        res.status(200).redirect('/')
    }catch(e){
        res.status(500)
    }
})

module.exports = router