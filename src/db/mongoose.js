const mongoose = require('mongoose')
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const Article = require('../models/Article')
const Bed = require('../models/Beds')
const Doctor = require('../models/Doctor')
const DoctorRequest = require('../models/DoctorRequest')
const Food = require('../models/Food')
const LeadRequestForm = require('../models/LeadRequestForm')
const Organisation = require('../models/Organisation')
const Oxygen = require('../models/Oxygen')
const Report = require('../models/Report')
const Vaccine = require('../models/Vaccines');
const VolOrgRequest = require('../models/VolOrgRequest')
const Volunteer = require('../models/Volunteer');


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await Article.init()
    await Bed.init()
    await Doctor.init()
    await DoctorRequest.init()
    await Food.init()
    await LeadRequestForm.init()
    await Organisation.init()
    await Oxygen.init()
    await Report.init()
    await Vaccine.init()
    await VolOrgRequest.init()
    await Volunteer.init()
})