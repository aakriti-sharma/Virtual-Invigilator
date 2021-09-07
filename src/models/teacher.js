const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const teacherSchema = new Schema({
    name: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(validator.isEmail(value) === false){
                throw new Error("Please provide with Valid Email ID")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    prn: {
        type: String,
        required: true
    }, 
    institute: {
        type: String,
        required: true
    },
    courses: {
        type: [String]
    },
    position: {
        type: String,
        default: "Professor"
    }
},{ 
    timestamps: true 
})

module.exports = mongoose.model('teacher', teacherSchema)