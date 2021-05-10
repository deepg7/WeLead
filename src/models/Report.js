const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
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
    },
    otp:{
        type:Number,
        required:true
    },
    org_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const Report = mongoose.model('Report',reportSchema)

module.exports = Report