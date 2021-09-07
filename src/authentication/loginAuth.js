// Middleware loginAuth for Authenticating Student
const express = require('express')
const jwt = require('jsonwebtoken')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

const loginAuth = async(req, res, next) => {
    const {
        email,
        password
    } = req.body

    if(!email || !password){
        return res.status(400).send()
    }
    var user;
    user = await Student.findOne({email})
    if(!user){
        user = await Teacher.findOne({email})
    }

    if(!user){
        return res.status(404).send('User Not Found')
    }

    // console.log(req.body)

    try{
        if(!await bcrypt.compare(password, user.password)){
            return res.send('Incorrect')
        }
        const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET_TOKEN)
        req.accessToken = accessToken
        res.status(200)
        next()
    }catch(e){
        console.log(e)
        return res.status(500).send()
    }
}

module.exports = loginAuth