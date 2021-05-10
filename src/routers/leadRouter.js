const express = require('express')
const router = new express.Router

const Bed = require('../models/Beds')
const Food = require('../models/Food')
const Oxygen = require('../models/Oxygen')
const Vaccine = require('../models/Vaccines')
const Organiser = require('../models/Organisation')
const Volunteer = require('../models/Volunteer')
const authFunctionOrg = require('../middleware/authOrg')
const authFunctionVol = require('../middleware/authVol')
const leadRequest = require('../models/LeadRequestForm')

//Post Organisation

router.post('/bed',authFunctionOrg,async(req,res)=>{
try{
    
    const lead = new Bed({
        ...req.body,
        org_id:req.organiser._id
    })
    lead.city=req.body.city.toLowerCase()
    await lead.save()
    const requests = await leadRequest.find({type:"beds"})
    if (!requests){
        return res.send(lead)
    }
    requests.forEach((request)=>{
        if (lead.pincode==request.pincode){
            console.log(request)
        }
        else if(lead.city==request.city){
            console.log(request)
        }
    })
    res.send(lead)
}catch(e){
    res.send('oof')
    console.log(e)
}
})

router.post('/food',authFunctionOrg,async(req,res)=>{
    try{
        
        const lead = new Food({
            ...req.body,
            org_id:req.organiser._id
        })
        lead.city=req.body.city.toLowerCase()
        await lead.save()
        const requests = await leadRequest.find({type:"food"})
    if (!requests){
        return res.send(lead)
    }
    requests.forEach((request)=>{
        if (lead.pincode==request.pincode){
            console.log(request)
        }
        else if(lead.city==request.city){
            console.log(request)
        }
    })
        res.send(lead)
    }catch(e){
        res.send('oof')
        console.log(e)
    }
})
router.post('/oxygen',authFunctionOrg,async(req,res)=>{
    try{
        
        const lead = new Oxygen({
            ...req.body,
            org_id:req.organiser._id
        })
        lead.city=req.body.city.toLowerCase()
        await lead.save()
        const requests = await leadRequest.find({type:"oxygen"})
    if (!requests){
        return res.send(lead)
    }
    requests.forEach((request)=>{
        if (lead.pincode==request.pincode){
            console.log(request)
        }
        else if(lead.city==request.city){
            console.log(request)
        }
    })
        res.send(lead)
    }catch(e){
        res.send('oof')
        console.log(e)
    }
})
router.post('/vaccine',authFunctionOrg,async(req,res)=>{
    try{
        
        const lead = new Vaccine({
            ...req.body,
            org_id:req.organiser._id
        })
        lead.city=req.body.city.toLowerCase()
        await lead.save()
        const requests = await leadRequest.find({type:"vaccine"})
    if (!requests){
        return res.send(lead)
    }
    requests.forEach((request)=>{
        if (lead.pincode==request.pincode){
            console.log(request)
        }
        else if(lead.city==request.city){
            console.log(request)
        }
    })
        res.send(lead)
    }catch(e){
        res.send('oof')
        console.log(e)
    }
})

//Post Volunteer

router.post('/bedV',authFunctionVol,async(req,res)=>{
    try{
        const lead = new Bed({
            ...req.body,
            org_id:req.volunteer.org_id
        })
        lead.city=req.body.city.toLowerCase()
        await lead.save()
        const requests = await leadRequest.find({type:"beds"})
    if (!requests){
        return res.send(lead)
    }
    requests.forEach((request)=>{
        if (lead.pincode==request.pincode){
            console.log(request)
        }
        else if(lead.city==request.city){
            console.log(request)
        }
    })
        res.send(lead)
    }catch(e){
        res.send('oof')
        console.log(e)
    }
})
    
router.post('/foodV',authFunctionVol,async(req,res)=>{
        try{
            
            const lead = new Food({
                ...req.body,
                org_id:req.volunteer.org_id
            })
            lead.city=req.body.city.toLowerCase()
            await lead.save()
            const requests = await leadRequest.find({type:"food"})
    if (!requests){
        return res.send(lead)
    }
    requests.forEach((request)=>{
        if (lead.pincode==request.pincode){
            console.log(request)
        }
        else if(lead.city==request.city){
            console.log(request)
        }
    })
            res.send(lead)
        }catch(e){
            res.send('oof')
            console.log(e)
        }
})
router.post('/oxygenV',authFunctionVol,async(req,res)=>{
    try{
            
        const lead = new Oxygen({
            ...req.body,
            org_id:req.volunteer.org_id
        })
        lead.city=req.body.city.toLowerCase()
        await lead.save()
        const requests = await leadRequest.find({type:"oxygen"})
        if (!requests){
            return res.send(lead)
        }
        requests.forEach((request)=>{
            if (lead.pincode==request.pincode){
                console.log(request)
            }
            else if(lead.city==request.city){
                console.log(request)
            }
        })
        res.send(lead)
    }catch(e){
        res.send('oof')
        console.log(e)
    }
    })
router.post('/vaccineV',authFunctionVol,async(req,res)=>{
    try{
        
        const lead = new Vaccine({
            ...req.body,
            org_id:req.volunteer.org_id
        })
        lead.city=req.body.city.toLowerCase()
        await lead.save()
        const requests = await leadRequest.find({type:"vaccine"})
        if (!requests){
            return res.send(lead)
        }
        requests.forEach((request)=>{
            if (lead.pincode==request.pincode){
                console.log(request)
            }
            else if(lead.city==request.city){
                console.log(request)
            }
        })
        res.send(lead)
    }catch(e){
        res.send('oof')
        console.log(e)
    }
})

//Delete Org
router.patch('/Bedv/:id',authFunctionOrg, async(req,res)=>{
    try {
        const bed = await Bed.findOne({_id:req.params.id,org_id:req.organiser._id})
        if (!bed){
            return res.status(404).send('bed not found!')
        }
        if(bed.availability<req.query.number){
            return res.status(404).send('Ni karsakte bhai')
        }
        bed.availability=bed.availability-req.query.number
        if(bed.availability==0){
            await bed.remove()
            return res.send('Lead has been Deleted')
        }
        await bed.save()
        res.send(bed)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/Foodv/:id',authFunctionOrg, async(req,res)=>{
    try {
        const food = await Food.findOne({_id:req.params.id,org_id:req.organiser._id})
        if (!food){
            return res.status(404).send('Food not found!')
        }
        if(food.availability<req.query.number){
            return res.status(404).send('Ni karsakte bhai')
        }
        food.availability=food.availability-req.query.number
        if(food.availability==0){
            await food.remove()
            return res.send('Lead has been Deleted')
        }
        await food.save()
        res.send(food)
    } catch (e) {
        res.status(500).send(e)
    }

})
router.patch('/Oxygenv/:id',authFunctionOrg, async(req,res)=>{
    try {
        const oxygen = await Oxygen.findOne({_id:req.params.id,org_id:req.organiser._id})
        if (!oxygen){
            return res.status(404).send('oxygen not found!')
        }
        if(oxygen.availability<req.query.number){
            return res.status(404).send('Ni karsakte bhai')
        }
        oxygen.availability=oxygen.availability-req.query.number
        if(oxygen.availability==0){
            await oxygen.remove()
            return res.send('Lead has been Deleted')
        }
        await oxygen.save()
        res.send(oxygen)
    } catch (e) {
        res.status(500).send(e)
    }

})
router.patch('/Vaccinev/:id',authFunctionOrg, async(req,res)=>{
    try {
        const vaccine = await Vaccine.findOne({_id:req.params.id,org_id:req.organiser._id})
        if (!vaccine){
            return res.status(404).send('vaccine not found!')
        }
        if(vaccine.availability<req.query.number){
           return res.status(404).send('Ni karsakte bhai')
        }
        vaccine.availability=vaccine.availability-req.query.number

        if(vaccine.availability==0){
            await vaccine.remove()
            return res.send('Lead has been Deleted')
        }
        await vaccine.save()
        res.send(vaccine)
    } catch (e) {
        res.status(500).send(e)
    }

})



// Delete Volunteer

router.patch('/Bedv/:id',authFunctionVol, async(req,res)=>{
    try {
        const bed = await Bed.findOne({_id:req.params.id,org_id:req.volunteer.org_id})
        if (!bed){
            return res.status(404).send('bed not found!')
        }
        if(bed.availability<req.query.number){
            return res.status(404).send('Ni karsakte bhai')
        }
        bed.availability=bed.availability-req.query.number
        if(bed.availability==0){
            await bed.remove()
            return res.send('Lead has been Deleted')
        }
        await bed.save()
        res.send(bed)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/Foodv/:id',authFunctionVol, async(req,res)=>{
    try {
        const food = await Food.findOne({_id:req.params.id,org_id:req.volunteer.org_id})
        if (!food){
            return res.status(404).send('Food not found!')
        }
        if(food.availability<req.query.number){
            return res.status(404).send('Ni karsakte bhai')
        }
        food.availability=food.availability-req.query.number
        if(food.availability==0){
            await food.remove()
            return res.send('Lead has been Deleted')
        }
        await food.save()
        res.send(food)
    } catch (e) {
        res.status(500).send(e)
    }

})
router.patch('/Oxygenv/:id',authFunctionVol, async(req,res)=>{
    try {
        const oxygen = await Oxygen.findOne({_id:req.params.id,org_id:req.volunteer.org_id})
        if (!oxygen){
            return res.status(404).send('oxygen not found!')
        }
        if(oxygen.availability<req.query.number){
            return res.status(404).send('Ni karsakte bhai')
        }
        oxygen.availability=oxygen.availability-req.query.number
        if(oxygen.availability==0){
            await oxygen.remove()
            return res.send('Lead has been Deleted')
        }
        await oxygen.save()
        res.send(oxygen)
    } catch (e) {
        res.status(500).send(e)
    }

})
router.patch('/Vaccinev/:id',authFunctionVol, async(req,res)=>{
    try {
        const vaccine = await Vaccine.findOne({_id:req.params.id,org_id:req.volunteer.org_id})
        if (!vaccine){
            return res.status(404).send('vaccine not found!')
        }
        if(vaccine.availability<req.query.number){
            return res.status(404).send('Ni karsakte bhai')
        }
        vaccine.availability=vaccine.availability-req.query.number
        if(vaccine.availability==0){
            await vaccine.remove()
            return res.send('Lead has been Deleted')
        }
        await vaccine.save()
        res.send(vaccine)
    } catch (e) {
        res.status(500).send(e)
    }

})


module.exports=router