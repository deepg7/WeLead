const mongoose = require('mongoose')

const oxygenSchema= new mongoose.Schema({
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
    price:{
        type:Number
    },
    availability:{
        type:Number,
        required:true
    }
})

const Oxygen = mongoose.model('Oxygen',oxygenSchema)

module.exports = Oxygen