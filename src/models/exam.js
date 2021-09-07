const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const examSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions: {
        type: [String],
        required: true
    },
    course: {
        type: String,
        required: true
    },
    duration: {
        start_time: { 
            type: Date,
            required: true,
            default: Date.now() 
        },
        end_time: { 
            type: Date,
            required: true,
            default: Date.now() + (1*60*60*1000) 
        }
    },
    instructor: {
        type: Schema.Types.ObjectId,
        required: true,
    }, 
    institute: {
        type: String
    },
    exam_code: {
        type: String,
        required: true,
        unique: true
    },
    students_attended: {
        type: [String]
    }
},{ 
    timestamps: true 
})

module.exports = mongoose.model('exam', examSchema)