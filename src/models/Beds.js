const mongoose = require('mongoose')

const bedSchema = new mongoose.Schema({
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
        of:String,
        required:true
    },
    org_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Organiser'
    },
    nurse:{
        type:Boolean,
        required:true
    },
    covid_meds:{
        type:Boolean,
        required:true
    },
    availability:{
        type:Number,
        required:true
    }
})

const Bed = mongoose.model('Bed',bedSchema)

module.exports = Bed