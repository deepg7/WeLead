const mongoose = require('mongoose')
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const volunteerSchema = mongoose.Schema({
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
    },
    org_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organiser'
    },
    contact:{
        type:Number,
        required:true
    },
    login:{
        type:Boolean,
        default:false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


volunteerSchema.virtual('beds',{
    ref:'Bed',
    localField:'org_id',
    foreignField:'org_id'
})

volunteerSchema.virtual('food',{
    ref:'Food',
    localField:'org_id',
    foreignField:'org_id'
})

volunteerSchema.virtual('oxygen',{
    ref:'Oxygen',
    localField:'org_id',
    foreignField:'org_id'
})

volunteerSchema.virtual('vaccines',{
    ref:'Vaccine',
    localField:'org_id',
    foreignField:'org_id'
})

volunteerSchema.methods.toJSON= function(){
    const user = this
    const userObject =user.toObject()

    delete userObject.password

    return userObject
}

volunteerSchema.methods.generateAuthToken= async function(){
   const volunteer = this
   const token = jwt.sign( { _id: volunteer._id.toString() },process.env.JWT_KEY)
   volunteer.tokens=volunteer.tokens.concat({token})
   await volunteer.save() 
   return token
}

volunteerSchema.statics.findByCredentials= async(email,password)=>{
    const volunteer = await Volunteer.findOne({email,login:true})
    console.log(volunteer)
    if(!volunteer){
        throw new Error('Unable to login')
    }
    const isMatch= await bcrypt.compare(password,volunteer.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return volunteer
}

volunteerSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
        console.log('Just before saving')
    }
    
    next()
})
const Volunteer = mongoose.model('Volunteer',volunteerSchema)

module.exports = Volunteer