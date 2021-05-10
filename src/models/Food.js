const mongoose = require('mongoose')

const foodSchema= new mongoose.Schema({
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
    jain:{
        type:Boolean,
        required:true
    },
    availability:{
        type:Number,
        required:true
    }
})

const Food = mongoose.model('Food',foodSchema)

module.exports = Food