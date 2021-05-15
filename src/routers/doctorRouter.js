const express = require('express')
const router = new express.Router
const getOTP = require('../middleware/otp')
const Doctor = require('../models/Doctor')
const DoctorRequest = require('../models/DoctorRequest')
const Article = require('../models/Article')
const authFunctionDoc = require('../middleware/authDoc')
const mail = require('../middleware/mail')

router.post('/signupDoc', async (req,res)=>{
    const password=getOTP()
    const doctor = new Doctor({
        ...req.body,
        password:password
    })
    try {
        await doctor.save()
        const output =`<h2>Kudos to you for taking the initiative and reaching out to us to join the march to help everyone who has been suffering in these severe times.</h2> 
<br><h3>Your OTP is: ${password}</h3><br>
<h2>We are grateful for your support and wish for the healthy living of everyone around.</h2>
<br>
<h3>Regards,<br> 
Team weLead.</h3>`
mail(doctor.email,'Sign Up and Password',output)
        const token = await doctor.generateAuthToken()
        res.status(201).send(doctor)
    } catch (e) {
     res.status(400).send('HEY')
    }
})

router.post('/loginDoc',async(req,res)=>{
    try {
        const doctor = await Doctor.findByCredentials(req.body.email,req.body.password)
        const token = await doctor.generateAuthToken()
        console.log(doctor)
        res.status(200).send({doctor,token})
    } catch (e) {
        res.status(400).send()
    }
 })

router.get('/requests',authFunctionDoc,async(req,res)=>{
    try {
        const requests = await DoctorRequest.find()
        res.status(200).send(requests)
    } catch (e) {
        res.status(400).send('oops')
    }
    
})


router.delete('/requests/:id',authFunctionDoc, async(req,res)=>{
    try {
        const request = await DoctorRequest.find({_id:req.params.id})
        await request.remove()
        res.send(request)
    } catch (e) {
        res.status(400).send('oops')
    }
    
})

router.post('/article',authFunctionDoc, async(req,res)=>{
    const article = new Article({
        ...req.body,
        author:req.doctor.name
    })
    try {
        await article.save()
        res.send(article)
    } catch (e) {
        res.send(e)
    }
    
})

router.get('/articles',async(req,res)=>{
    try {
        const articles = await Article.find()
        res.send(articles)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router