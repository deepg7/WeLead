const express = require('express')
require('dotenv').config({path: __dirname + '/.env'})
require('./src/db/mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const organiserRouter = require('./src/routers/organizerRouter')
const leadRouter = require('./src/routers/leadRouter')
const userLeadRouter = require('./src/routers/UserLead')
const volunteerRouter = require('./src/routers/volunteerRouter')
const RequestRouter = require('./src/routers/requests')
const doctorRouter = require('./src/routers/doctorRouter')

const errorHandler = require('./src/middleware/errorHandler')
const { NotFoundError } = require('./src/utils/error')

const path = require('path')

const viewsPath = path.join(__dirname,'/public')
console.log(viewsPath)
app.use(express.static(viewsPath));
app.use(express.json())
app.use(cors())
app.use(organiserRouter)
app.use(leadRouter)
app.use(userLeadRouter)
app.use(volunteerRouter)
app.use(RequestRouter)
app.use(doctorRouter)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/landing.html'))
})

app.all('*',(req,res,next)=>{
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log('Server is up on Port:', port)
})