const express = require('express')
const router = new express.Router

const getOTP = require('../middleware/otp')
const jwt = require('jsonwebtoken')
const authFunctionOrg = require('../middleware/authOrg')
const Organiser = require('../models/Organisation')
const Volunteer = require('../models/Volunteer')
const Request = require('../models/VolOrgRequest')
const mail = require('../middleware/mail')


router.post('/signup', async (req,res)=>{
    const password=getOTP()
    const organiser = new Organiser({
        ...req.body,
        password:password
    })
    console.log(password)
    try {
        await organiser.save()
        const output =`<h2>Kudos to you for taking the initiative and reaching out to us to join the march to help everyone who has been suffering in these severe times.</h2> 
      <br><h3>Your OTP is: ${password}</h3><br>
      <h2>We are grateful for your support and wish for the healthy living of everyone around.</h2>
      <br>
      <h3>Regards,<br> 
      Team weLead.</h3>`
mail(organiser.email,'Sign Up and Password',output)
        const token = await organiser.generateAuthToken()
        res.status(201).send(organiser)
    } catch (e) {
     res.status(400).send('HEY')
    }
 })

 router.post('/login',async(req,res)=>{
   try {
       const organiser = await Organiser.findByCredentials(req.body.email,req.body.password)
       const token = await organiser.generateAuthToken()
       console.log(organiser)
       
       res.status(200).send({organiser,token})
      
   } catch (e) {
       res.status(400).send()
   }
})


 router.post('/addV',authFunctionOrg, async (req,res)=>{
    const volunteer = new Volunteer({
       ...req.body,
       org_id:req.organiser._id,
       login:true
    })
    console.log(volunteer)
    try {
        await volunteer.save()
        const output =`<h2>Kudos to you for taking the initiative and reaching out to us to join the march to help everyone who has been suffering in these severe times.</h2> 
<br><h3>Your OTP is: ${password}</h3><br>
<h2>We are grateful for your support and wish for the healthy living of everyone around.</h2>
<br>
<h3>Regards,<br> 
Team weLead.</h3>`
mail(volunteer.email,'Sign Up and Password',output)
        const token = await volunteer.generateAuthToken()
        res.status(201).send(volunteer)
    } catch (e) {
     res.status(400).send('HEY')
    }
 })
 router.get('/getV',authFunctionOrg,async(req,res)=>{
    await req.organiser.populate('volunteers').execPopulate()
    res.status(200).send(req.organiser.volunteers)
 })

 router.get('/getAllLeads',authFunctionOrg,async(req,res)=>{
    try {
      await req.organiser.populate('beds').execPopulate()
      const beds = req.organiser.beds
      await req.organiser.populate('food').execPopulate()
     const foods = req.organiser.food
     await req.organiser.populate('oxygen').execPopulate()
     const oxygens = req.organiser.oxygen
     await req.organiser.populate('vaccines').execPopulate()
     const vaccines = req.organiser.vaccines
     res.status(200).send({beds,foods,oxygens,vaccines})
    } catch (e) {
       res.send('lol')
    }
   
 })

 router.get('/getB',authFunctionOrg,async(req,res)=>{
    await req.organiser.populate('beds').execPopulate()
    const beds = req.organiser.beds
    res.status(200).send(beds)
 })

 router.get('/getF',authFunctionOrg,async(req,res)=>{
    await req.organiser.populate('food').execPopulate()
    res.status(200).send(req.organiser.food)
 })

 router.get('/getO',authFunctionOrg,async(req,res)=>{
    await req.organiser.populate('oxygen').execPopulate()
    res.status(200).send(req.organiser.oxygen)
 })

 router.get('/getVa',authFunctionOrg,async(req,res)=>{
    await req.organiser.populate('vaccines').execPopulate()
    res.status(200).send(req.organiser.vaccines)
 })

router.get('/viewVolRequests',authFunctionOrg,async(req,res)=>{
   const requests = await Request.find({org_id:req.organiser._id})
   let volunteers = []
   let i = 0
   requests.forEach(async(request)=>{
     const vol = await Volunteer.find({_id:request.vol_id})
      volunteers[volunteers.length]=vol
      i++
      if(i==requests.length){
         res.send(volunteers)
      }
   })
}) 
 
router.post('/volunteerReq/:id',authFunctionOrg, async(req,res)=>{
   try {
      const status = req.query.status
   const request = await Request.find({_id:req.params.id})
   const volunteer = await Volunteer.find({_id:request.vol_id})
   if(status==true){
      volunteer.login=true
      volunteer.org_id=req.organiser._id
      await volunteer.save()
      await request.remove()
      return res.send(volunteer)
   }
   else{
      await volunteer.remove()
      await request.save()
      res.send('removed volunteer request')
   }
   } catch (e) {
      res.send(e)
   }
   
})


 module.exports=router