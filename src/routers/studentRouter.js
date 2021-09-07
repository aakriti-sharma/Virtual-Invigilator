const express = require('express')
var app = express()
const router = express.Router()
const Student = require('../models/student')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginAuth = require('../authentication/loginAuth')
const verifyToken = require('../authentication/verifyToken')
const Exam = require('../models/exam')


/**
 * @method - GET
 * @route - /student/register
 * @param - none
 * @description - Registration Page for student.
 * @access - All
 */
router.get('/student/register', (req, res) =>{
    try{
        res.status(200).render('registerStudent')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - POST
 * @route - /student/register
 * @param - none
 * @description - Registration Page for student.
 * @access - All
 */
router.post('/student/submit/:exam_code', verifyToken, async(req, res) =>{
    try{
        var user = await Student.find({ email: req.user.email })
        var answer = req.body.answer
        var focusCount = parseInt(req.body.focus)
        var eyeCount = parseInt(req.body.eye)
        console.log(answer,focusCount,eyeCount);
        for (test_code in user.tests_attended){
            if(test_code === req.params.exam_code){
                res.status(400).send()
            }
        }
        var fraudScore = focusCount + eyeCount
        fraudScore += ''
        // console.log(user, req.params.exam_code)
        await Student.updateOne({ email: req.user.email }, { tests_attended: req.params.exam_code })
        // await user.push({ tests_attended: req.params.exam_code })
        console.log('Done')
        await Student.updateOne({ email: req.user.email }, { answer: req.body.answer })
        await Student.updateOne({ email: req.user.email }, { tests_fraud_score: fraudScore })
        console.log('Done')
        // user.push({ answer: [answer] })
        // await user.save()
        // console.log(user)
        const exam = await Exam.findOne({})
        res.status(200).redirect('/dashboard')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /student/analysis
 * @param - none
 * @description - Analysis Page for student.
 * @access - All
 */
router.get('/student/analysis', async(req, res) =>{
    try{
        var user;
        if(req.session.accessToken){
            jwt.verify(req.session.accessToken, process.env.JWT_SECRET_TOKEN, (err, userFromToken) => {
                if(err){
                    return res.status(403).send('Wrong')
                }
                console.log(userFromToken)
                user = userFromToken
            })
        }
        if(user.tests_attended.length==0)
        {
            var exam_name = 'No Exams Found'
        }
        
        else
        {
            var test_len = user.tests_attended.length-1;
            var exam_name = await Exam.findOne({ exam_code: user.tests_attended[test_len] })
        }
        res.status(200).render('tests_available', {
            user,
            exam_name
        })
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - POST
 * @route - /student/register
 * @param - All Info mentioned in models/student.js
 * @description - Register a Student.
 * @access - All
 */
router.post('/student/register', async(req, res) =>{
    try{
        // Getting the Variables from Body
        // Validating the Body
        if(!req.body.fname || !req.body.lname || !req.body.prn || !req.body.institute || !req.body.email || !req.body.password){
            return res.status(400).send("Please Provide all fields: Name, Email, Password, PRN, Institute Name, Academic Year")
        }

        if(req.body.fname.length < 4){
            return res.status(400).send("Name must be at least 4 letters long")
        }

        // console.log(req.body.password)
        // Hashing Password
        const salt = bcrypt.genSaltSync()
        var hashedPassword = bcrypt.hashSync(req.body.password, salt)

        // console.log(hashedPassword)
        // Creating MongoDB user instance.
        var student = new Student({
            name: {firstname: req.body.fname, lastname: req.body.lname},
            prn: req.body.prn,
            email: req.body.email,
            institute: req.body.institute,
            password: hashedPassword,
            academic_year: {start_date: req.body.aca_start, end_date: req.body.aca_end},
            courses: req.body.subject
        })

        // Saving User
        await student.save()
        res.status(200).redirect('/login')
    }catch(e){
        if(e.code === 11000){
            res.status(400).send('User Already Exists')
        }
        console.log(e);
    }
})


module.exports = router