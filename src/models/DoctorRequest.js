const mongoose = require('mongoose')

const doctorRequestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
    },
    contact:{
        type:Number,
        required:true
    },
    reason:{
        type:String,
        required:true
    }
})

const DoctorRequest = mongoose.model('DoctorRequest',doctorRequestSchema)

module.exports = DoctorRequest