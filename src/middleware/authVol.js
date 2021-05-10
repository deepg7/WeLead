const jwt=require('jsonwebtoken')
const Organiser = require('../models/Organisation')
const Volunteer = require('../models/Volunteer')
const { AuthenticationError } = require('../utils/error')
const errorHandler = require('./errorHandler')

const authFunctionVol = async (req,res,next)=>{
    try{
        
        const token=req.header('Authorization').replace('Bearer ', '')
        const decoded=jwt.verify(token, process.env.JWT_KEY)
        const volunteer =await Volunteer.findOne({_id: decoded._id,'tokens.token':token})

        if(!volunteer)
        {
            throw new AuthenticationError
        }

        req.volunteer=volunteer
        req.token=token
        next()

    }
    catch(e){
        errorHandler(new AuthenticationError,req,res)
    }
}

module.exports = authFunctionVol