const express = require('express')
var app = express()
const router = express.Router()
const Teacher = require('../models/teacher')
const bcrypt = require('bcryptjs')
const verifyToken = require('../authentication/verifyToken')
const Exam = require('../models/exam')
const Student = require('../models/student')

/**
 * @method - GET
 * @route - /teacher/register
 * @param - none
 * @description - Registration Page for teacher.
 * @access - All
 */
router.get('/teacher/register', (req, res) =>{
    try{
        res.status(200).render('registerTeacher')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - POST
 * @route - /teacher/register
 * @param - All Info mentioned in models/teacher.js
 * @description - Register a Teacher.
 * @access - All
 */
router.post('/teacher/register', async(req, res) =>{
    try{
        // Getting the Variables from Body
        // const {
        //     name,
        //     prn,
        //     position,
        //     email,
        //     institute,
        //     password,
        //     courses
        // } = req.body
        // console.log(req.body)
        // Validating the Body
        if(!req.body.fname || !req.body.prn || !req.body.institute || !req.body.email || !req.body.password){
            res.status(400).send("Please Provide all fields: Name, Email, Password, PRN and Institute Name")
        }

        if(req.body.fname.length < 4){
            res.status(400).send("Name must be at least 4 letters long")
        }

        // Hashing Password
        const salt = bcrypt.genSaltSync()
        var hashedPassword = bcrypt.hashSync(req.body.password, salt)

        // Creating MongoDB user instance.
        var teacher = new Teacher({
            name: {firstname: req.body.fname, lastname: req.body.lname},
            prn: req.body.prn,
            email: req.body.email,
            institute: req.body.institute,
            password: hashedPassword,
            position: req.body.position,
            courses: req.body.subject
        })

        // Saving User
        await teacher.save()
        res.status(200).redirect('/login')
    }catch(e){
        if(e.code === 11000){
            res.status(400).send('User Already Exists')
        }
        console.log(e)
        res.status(500).send(e)
    }
})

/**
 * @method - GET
 * @route - /teacher/analysis
 * @param - none
 * @description - Registration Page for teacher.
 * @access - All
 */
router.get('/teacher/analysis', verifyToken, async(req, res) =>{
    try{
        const teacher = req.user
        const latest_exam = await Exam.findOne({ instructor: teacher._id })
        const exam_name = latest_exam.exam_code
        students_attended = await Student.find({ tests_attended: [ exam_name ] })
        var user=teacher
        var exam_n=latest_exam.name
        res.status(200).render('tests_submitted', {
            user,
            exam_n,
            students_attended
        })
    }catch(e){
        res.status(500)
    }
})


module.exports = router