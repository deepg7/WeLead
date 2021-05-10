const jwt=require('jsonwebtoken')
const Doctor = require('../models/Doctor')
const { AuthenticationError } = require('../utils/error')
const errorHandler = require('./errorHandler')

const authFunctionDoc = async (req,res,next)=>{
    try{
        
        const token=req.header('Authorization').replace('Bearer ', '')
        const decoded=jwt.verify(token, process.env.JWT_KEY)
        const doctor =await Doctor.findOne({_id: decoded._id,'tokens.token':token})

        if(!doctor)
        {
            throw new AuthenticationError
        }

        req.doctor=doctor
        req.token=token
        next()

    }
    catch(e){
        errorHandler(new AuthenticationError,req,res)
    }
}


module.exports = authFunctionDoc
