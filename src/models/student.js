const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const studentSchema = new Schema({
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
    academic_year: {
        start_date: { type: Date, default: Date.now() },
        end_date: { type: Date, default: Date.now() + (31557600000) } // 31557600000 = 1 Year
    },
    instructors: {
        type: [String]
    },
    courses: {
        type: [String]
    },
    tests_integrity_score: {
        type: [String]
    },
    tests_fraud_score: {
        type: [String]
    },
    tests_attended: {
        type: [String]
    },
    token: {
        type: String
    }, 
    answers: {
        type: [[String]],
    }
},{ 
    timestamps: true 
})

module.exports = mongoose.model('student', studentSchema)