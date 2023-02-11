const express=require('express')
require('dotenv').config()
require('./Model/dbModel')
const app=express()
const cors=require('cors')
const userRoute= require('./Routes/userRoute')
const adminRoute=require('./Routes/admnRoute')
const cookieParser = require('cookie-parser')
const port= process.env.PORT || 7889

app.use(cors(
    {
        origin:[`http://localhost:3000`],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true
    }
    ))
app.use(express.json())
app.use(cookieParser())
app.use('/',userRoute)
app.use('/admin',adminRoute)
app.listen(port,()=>console.log(`Server is running at http://localhost:${port}`))