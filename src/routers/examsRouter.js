const express = require('express')
var app = express()
const router = express.Router()
const Student = require('../models/student')
const Exam = require('../models/exam')
const verifyToken= require('../authentication/verifyToken')
const loginAuth = require('../authentication/loginAuth')
const jwt = require('jsonwebtoken')

/**
 * @method - GET
 * @route - /exam/:id
 * @param - Token
 * @description - Exam Page for student.
 * @access - Student
 */
router.get('/exam/:exam_code', async(req, res) =>{
    try{
        res.status(200).render('studentExam', { examid:  req.params.exam_code })
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - POST
 * @route - /createExam
 * @param - Token
 * @description - Exam Creation Page for Teacher.
 * @access - Teacher
 */
router.post('/createExam', verifyToken, async(req, res) =>{
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
        }else{ return res.redirect('/')}
        if(!user.position){
            req.status(400).send('Unauthorized')
        }
        var exam = new Exam({
            name: req.body.name,
            questions: req.body.question,
            course: req.body.course,
            duration: { start_time: req.body.start_time, end_time: req.body.end_time },
            instructor: req.user._id, 
            institute: req.user.institute,
            exam_code: req.body.exam_code
        })
        await exam.save()
        res.status(200).redirect('/dashboard')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /createExam
 * @param - Token
 * @description - Exam Creation Page for Teacher.
 * @access - Teacher
 */
router.get('/createExam', verifyToken, async(req, res) =>{
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
        if(!user.position){
            req.status(400).send('Unauthorized')
        }
        res.status(200).render('createExam')
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - POST
 * @route - /exists/:exam_code
 * @param - Token
 * @description - Exists Page for student.
 * @access - Student
 */
router.post('/exists', verifyToken, async(req, res) =>{
    try{
        var exam_code = req.body.exam_code
        var exam_code_exists = await Exam.findOne({exam_code})
        if(!exam_code_exists){
            res.status(400).send('Incrorrect')
        }else{
            res.status(200).send('Done')
        }
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /assessment/:exam_code
 * @param - Token
 * @description - Assessment Page for student.
 * @access - Student
 */
router.get('/assessment/:exam_code', verifyToken, async(req, res) =>{
    try{
        var user = req.user
        for (test_code in user.tests_attended){
            if(test_code === req.params.exam_code){
                res.status(400).send('Incrorrect')
            }
        }
        var exam_code = req.params.exam_code
        if(!exam_code){
            res.status(400).send('Incrorrect')
        }else{
            var exam = await Exam.findOne({exam_code})
            res.status(200).render('assessment', {
                exam,
                user: req.user
            })
        }
    }catch(e){
        res.status(500)
    }
})

/**
 * @method - GET
 * @route - /assessment/questions/:exam_code
 * @param - Token
 * @description - Assessment Page for student.
 * @access - Student
 */
router.post('/assessment/questions/:exam_code', verifyToken, async(req, res) =>{
    try{
        var exam_code = req.params.exam_code
        if(!exam_code){
            res.status(400).send('Incrorrect')
        }else{
            var exam = await Exam.findOne({exam_code})
            res.status(200).send({
                questions: exam.questions,
            })
        }
    }catch(e){
        res.status(500)
    }
})

module.exports = router