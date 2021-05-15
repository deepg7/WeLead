const express = require('express')
const router = new express.Router

const jwt = require('jsonwebtoken')
const authFunctionVol = require('../middleware/authVol')
const getOTP = require('../middleware/otp')
const Organiser = require('../models/Organisation')
const Volunteer = require('../models/Volunteer')
const Req = require('../models/VolOrgRequest')
const mail = require('../middleware/mail')

router.post('/signupVol', async (req,res)=>{
    const password = getOTP()
    const volunteer = new Volunteer({
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        password:password
    })
    try {
        const token = await volunteer.generateAuthToken()
        await volunteer.save()
        const organiser = await Organiser.findOne({name:req.body.org_name})
        console.log(organiser)
        const request = new Req({
            vol_id:volunteer._id,
            org_id:organiser._id
        })
        console.log(request)
        await request.save()
        const output =`<h2>Kudos to you for taking the initiative and reaching out to us to join the march to help everyone who has been suffering in these severe times.</h2> 
<br><h3>Your OTP is: ${password}</h3><br>
<h2>We are grateful for your support and wish for the healthy living of everyone around.</h2>
<br>
<h2>Please note that you can only sign in once the organisation accepts your request. You'll receive a mail for any further updates</h2> 
<h3>Regards,<br> 
Team weLead.</h3>`
mail(volunteer.email,'Sign Up and Password',output)
        
        res.status(201).send(volunteer)
    } catch (e) {
     res.status(400).send('HEY')
    }
 })

router.post('/loginVol',async(req,res)=>{
    try {
        const volunteer = await Volunteer.findByCredentials(req.body.email,req.body.password)
        const token = await volunteer.generateAuthToken()
        res.status(200).send(volunteer)
       
    } catch (e) {
        res.status(400).send('oops')
    }
})

router.get('/getAllLeadsVol',authFunctionVol,async(req,res)=>{
    try {
      await req.volunteer.populate('beds').execPopulate()
      const beds = req.volunteer.beds
      await req.volunteer.populate('food').execPopulate()
     const foods = req.volunteer.food
     await req.volunteer.populate('oxygen').execPopulate()
     const oxygens = req.volunteer.oxygen
     await req.volunteer.populate('vaccines').execPopulate()
     const vaccines = req.volunteer.vaccines
     res.status(200).send({beds,foods,oxygens,vaccines})
    } catch (e) {
       res.send('lol')
    }
   
 })

router.get('/seeB',authFunctionVol,async(req,res)=>{
     await req.volunteer.populate('beds').execPopulate()
     res.status(200).send(req.volunteer.beds)
  })

  router.get('/seeF',authFunctionVol,async(req,res)=>{
    await req.volunteer.populate('food').execPopulate()
    res.status(200).send(req.volunteer.food)
 }) 

 router.get('/seeO',authFunctionVol,async(req,res)=>{
    await req.volunteer.populate('oxygen').execPopulate()
    res.status(200).send(req.volunteer.oxygen)
 })

 router.get('/seeV',authFunctionVol,async(req,res)=>{
    await req.volunteer.populate('vaccines').execPopulate()
    res.status(200).send(req.volunteer.vaccines)
 })

module.exports=router