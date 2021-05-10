const express = require('express')
const router = new express.Router
const leadRequest = require('../models/LeadRequestForm')
const DoctorRequest = require('../models/DoctorRequest')
const Report = require('../models/Report')
const getOTP = require('../middleware/otp')
const Organiser = require('../models/Organisation')

router.post('/requestLeads',async(req,res)=>{
    try {
        const request = new leadRequest(req.body)
        request.city=req.body.city.toLowerCase()
        await request.save()
        res.status(200).send(request)
    } catch (e) {
        res.status(400).send('oops')
    }
})

router.post('/requestDoctor',async(req,res)=>{
    try {
        const request = new DoctorRequest(req.body)
        console.log(req)
        console.log(request)
        await request.save()
        res.status(200).send(request)
    } catch (e) {
        res.status(400).send('oops')
    }
})

router.post('/report/:id',async(req,res)=>{
    try {
        const otp = getOTP()
        const report = new Report({
            ...req.body,
            otp:otp,
            org_id:req.params.id
        })
        await report.save()
        res.send(report)
    } catch (e) {
        res.send('lol')
    }
})

router.post('/confirmReport/:id',async(req,res)=>{
    const report = await Report.findOne({_id:req.params.id})
    if(report.otp==null){
        res.send('Expired')
    }
    else if(req.body.otp==report.otp){
        const organiser = await Organiser.find({_id:report.org_id})
        organiser.scam += 1
        if (organiser.scam==10){
            await organiser.remove()
        }
        else{
            await organiser.save()
        }
    }
    else{
        res.send('Wrong Otp Entered, Please try again!')
    }
})

module.exports=router