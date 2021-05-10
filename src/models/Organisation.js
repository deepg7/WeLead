const mongoose = require('mongoose')
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const organiserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true, 
    },
    type:{
        type:Array,
        of:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Array,
        of:Number,
        required:true
    },
    scam:{
        type:Number,
        default:0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

organiserSchema.virtual('volunteers',{
    ref:'Volunteer',
    localField:'_id',
    foreignField:'org_id'
})

organiserSchema.virtual('beds',{
    ref:'Bed',
    localField:'_id',
    foreignField:'org_id'
})

organiserSchema.virtual('food',{
    ref:'Food',
    localField:'_id',
    foreignField:'org_id'
})

organiserSchema.virtual('oxygen',{
    ref:'Oxygen',
    localField:'_id',
    foreignField:'org_id'
})

organiserSchema.virtual('vaccines',{
    ref:'Vaccine',
    localField:'_id',
    foreignField:'org_id'
})


organiserSchema.methods.toJSON= function(){
    const user = this
    const userObject =user.toObject()

    delete userObject.password

    return userObject
}

organiserSchema.methods.generateAuthToken= async function(){
  
   const organiser = this
   console.log(organiser)
   const token = jwt.sign( { _id: organiser._id.toString() },process.env.JWT_KEY)
   organiser.tokens=organiser.tokens.concat({token})
   await organiser.save()
   console.log('bye')
   return token
}

organiserSchema.statics.findByCredentials= async(email,password)=>{
    const organiser = await Organiser.findOne({email})
    
    if(!organiser){
        throw new Error('Unable to login')
    }
    const isMatch= await bcrypt.compare(password,organiser.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    console.log('hi')
    return organiser
}

organiserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
        console.log('Just before saving')
    }
    
    next()
})


const Organiser = mongoose.model('Organiser',organiserSchema)

module.exports = Organiser