import express from 'express';
import { authenticate } from './utils.js';
import { config } from "dotenv";
config();



const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000





app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const user = await authenticate(username,password)
    if(user){
        res.json({msg:"login successful",user})
    }else{
        res.status(401).json({msg:"wrong username or password "})
    }
})

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})