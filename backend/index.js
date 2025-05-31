import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './lib/db.js';

const app = express();
const port = process.env.PORT || 8000
connectDB()
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Server is running!")
})

app.listen(port,()=>{
    console.log(`Server is running local host: ${port}`)
})