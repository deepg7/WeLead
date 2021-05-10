const mongoose = require('mongoose')

const leadRequestSchema = new mongoose.Schema({
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
    city:{
        type: String,
        required: true,
    },
    pincode:{
        type: String,
        required: true,
    },
    type:{
        type:String,
        required:true
    }
})    

const leadRequest = mongoose.model('leadRequest',leadRequestSchema)

module.exports = leadRequest