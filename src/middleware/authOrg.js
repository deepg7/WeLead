const jwt=require('jsonwebtoken')
const Organiser = require('../models/Organisation')
const { AuthenticationError } = require('../utils/error')
const errorHandler = require('./errorHandler')

const authFunctionOrg = async (req,res,next)=>{
    try{
        
        const token=req.header('Authorization').replace('Bearer ', '')
        const decoded=jwt.verify(token, process.env.JWT_KEY)
        const organiser =await Organiser.findOne({_id: decoded._id,'tokens.token':token})

        if(!organiser)
        {
            throw new AuthenticationError
        }

        req.organiser=organiser
        req.token=token
        next()
        console.log('hi')

    }
    catch(e){
        errorHandler(new AuthenticationError,req,res)
    }
}


module.exports = authFunctionOrg
