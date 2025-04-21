import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routers/index.js'

dotenv.config()

const PORT = process.env.PORT || 4000;

const app=express()
app.use(express.json({limit:"40MB"}))

app.use(cors())

app.use("/api",router)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected succesfully"))
.catch((error)=>console.log(error))

app.listen(PORT,()=>console.log(`server running ${PORT} `))  