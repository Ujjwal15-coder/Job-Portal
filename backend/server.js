import express from 'express';
import studentRoute from './routes/studentRoute.js'
import companyRoute from './routes/companyRoute.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();

const app=express();

app.use(cors({
    origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"] : ["http://localhost:5173","http://localhost:5174"],
    credentials:true
}))
connectDB();
app.use(express.json())
const PORT=process.env.PORT || 5000;

app.use('/student',studentRoute)
app.use('/company',companyRoute)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
