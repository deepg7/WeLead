const mongoose = require('mongoose')
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const doctorSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

doctorSchema.methods.toJSON= function(){
    const user = this
    const userObject =user.toObject()

    delete userObject.password

    return userObject
}

doctorSchema.methods.generateAuthToken= async function(){
   const organiser = this
   const token = jwt.sign( { _id: organiser._id.toString() },process.env.JWT_KEY)
   organiser.tokens=organiser.tokens.concat({token})
   await organiser.save()
   console.log('bye')
   return token
}

doctorSchema.statics.findByCredentials= async(email,password)=>{
    const doctor = await Doctor.findOne({email})
    console.log(doctor)
    if(!doctor){
        throw new Error('Unable to login')
    }
    const isMatch= await bcrypt.compare(password,doctor.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    console.log('hi')
    return doctor
}

doctorSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
        console.log('Just before saving')
    }
    
    next()
})


const Doctor = mongoose.model('Doctor',doctorSchema)

module.exports = Doctor