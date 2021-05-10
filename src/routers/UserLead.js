const express = require('express')
const router = new express.Router

const Bed = require('../models/Beds')
const Food = require('../models/Food')
const Oxygen = require('../models/Oxygen')
const Vaccine = require('../models/Vaccines')
const Organiser = require('../models/Organisation')

//Get By Pincode

router.get('/getBedsP',async(req,res)=>{
    try {
        const pincode=req.query.pincode
        const beds = await Bed.find({pincode})
        let name=[]
        let i=0
        beds.forEach(async(bed) => {
            const org= await Organiser.findOne({_id:bed.org_id})
            name[name.length]=org.name
            i++
            if (i==beds.length){
                res.status(200).send({beds,name})
            }
        });        
       
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/getFoodP',async(req,res)=>{
    try {
        const pincode=req.query.pincode
        const foods = await Food.find({pincode})
        let name=[]
        let i=0
        foods.forEach(async(food) => {
            const org= await Organiser.findOne({_id:food.org_id})
            name[name.length]=org.name
            i++
            if (i==foods.length){
                res.status(200).send({foods,name})
            }
        });  
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/getOxygenP',async(req,res)=>{
    try {
        const pincode=req.query.pincode
        const oxygens = await Oxygen.find({pincode})
        let name=[]
        let i=0
        oxygens.forEach(async(oxygen) => {
            const org= await Organiser.findOne({_id:oxygen.org_id})
            name[name.length]=org.name
            i++
            if (i==oxygens.length){
                res.status(200).send({oxygens,name})
            }
        });
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/getVaccinesP',async(req,res)=>{
    try {
        const pincode=req.query.pincode
        const vaccines = await Vaccine.find({pincode})
        let name=[]
        let i=0
        vaccines.forEach(async(vaccine) => {
            const org= await Organiser.findOne({_id:vaccine.org_id})
            name[name.length]=org.name
            i++
            if (i==vaccines.length){
                res.status(200).send({vaccines,name})
            }
        }); 
    } catch (e) {
        res.status(404).send(e)
    }
})

//Get By City

router.get('/getBedsC',async(req,res)=>{
    try {
        const city=req.query.city.toLowerCase()
        const beds = await Bed.find({city})
        let name=[]
        let i=0
        beds.forEach(async(bed) => {
            const org= await Organiser.findOne({_id:bed.org_id})
            name[name.length]=org.name
            i++
            if (i==beds.length){
                res.status(200).send({beds,name})
            }
        });   
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/getFoodC',async(req,res)=>{
    console.log('hi')
    try {
        const city=req.query.city.toLowerCase()
        const foods = await Food.find({city})
        let name=[]
        let i=0
        foods.forEach(async(food) => {
            const org= await Organiser.findOne({_id:food.org_id})
            name[name.length]=org.name
            i++
            if (i==foods.length){
                res.status(200).send({foods,name})
            }
        });
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/getOxygenC',async(req,res)=>{
    try {
        const city=req.query.city.toLowerCase()
        const oxygens = await Oxygen.find({city})
        let name=[]
        let i=0
        oxygens.forEach(async(oxygen) => {
            const org= await Organiser.findOne({_id:oxygen.org_id})
            name[name.length]=org.name
            i++
            if (i==oxygens.length){
                res.status(200).send({oxygens,name})
            }
        });
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/getVaccinesC',async(req,res)=>{
    try {
        const city=req.query.city.toLowerCase()
        const vaccines = await Vaccine.find({city})
        let name=[]
        let i=0
        vaccines.forEach(async(vaccine) => {
            const org= await Organiser.findOne({_id:vaccine.org_id})
            name[name.length]=org.name
            i++
            if (i==vaccines.length){
                res.status(200).send({vaccines,name})
            }
        }); 
    } catch (e) {
        res.status(404).send(e)
    }
})



module.exports=router