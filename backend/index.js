import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './lib/db.js';
import userRouter from './routes/user.route.js'

const app = express();
const port = process.env.PORT || 8000
connectDB()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/auth',userRouter)
app.listen(port,()=>{
    console.log(`Server is running local host: ${port}`)
})