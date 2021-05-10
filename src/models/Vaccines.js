const mongoose = require('mongoose')

const vaccineSchema= new mongoose.Schema({
    city:{
        type: String,
        required: true,
    },
    locality:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true,
    },
    contact:{
        type:Array,
        of:Number,
        required:true
    },
    org_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Organiser'
    },
    type:{
        type:Array,
        of:String,
        required:true
    },
    availability:{
        type:Number,
        required:true
    }
})

const Vaccine = mongoose.model('Vaccine',vaccineSchema)

module.exports = Vaccine