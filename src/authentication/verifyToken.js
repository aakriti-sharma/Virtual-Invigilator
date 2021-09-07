const bcrypt = require('bcryptjs')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const jwt = require('jsonwebtoken')

createToken = (req, res, next) => {
    // console.log(req.session)
    const token = req.session.accessToken
    // console.log(authHeader)
    if(!token){
        // console.log(token)
        return res.status(400).send()
    }
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
        if(err){
            return res.status(403).send()
        }
        // console.log(user)
        req.user = user
        res.status(200)
        next()
    })
}

module.exports = createToken