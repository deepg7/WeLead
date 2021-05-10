const mongoose = require('mongoose')

const reqSchema = new mongoose.Schema({
    vol_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    org_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})

const Req = mongoose.model('Req',reqSchema)

module.exports = Req